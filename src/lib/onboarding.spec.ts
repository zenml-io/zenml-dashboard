import { OnboardingChecklistItemName } from "@/types/onboarding";
import { describe, expect, test } from "vitest";
import { checkDownstreamStep, getProgress, getStarterSetupItems } from "./onboarding";

describe("returns the correct items for the starter setup based on the deployment type", () => {
	test("doesnt return connect step for local deployment", () => {
		const isLocal = true;
		const items = getStarterSetupItems(isLocal);
		expect(items).toEqual(["pipeline_run"]);
	});

	test("includes the connect step for non-local deployments", () => {
		const isLocal = false;
		const items = getStarterSetupItems(isLocal);
		expect(items).toEqual(["device_verified", "pipeline_run"]);
	});
});

describe("returns the correct progress, depending on the current state", () => {
	test("returns 2 if the first two steps are done", () => {
		const onboardingState: OnboardingChecklistItemName[] = ["device_verified", "pipeline_run"];
		const finalStep = "starter_setup_completed";
		const items: OnboardingChecklistItemName[] = [
			"device_verified",
			"pipeline_run",
			"remote_artifact_store_created"
		];
		const progress = getProgress(onboardingState, items, finalStep);
		expect(progress).toBe(2);
	});

	test("returns 0 if no steps are done", () => {
		const onboardingState: OnboardingChecklistItemName[] = [];
		const finalStep = "starter_setup_completed";
		const items: OnboardingChecklistItemName[] = ["device_verified", "pipeline_run"];
		const progress = getProgress(onboardingState, items, finalStep);
		expect(progress).toBe(0);
	});

	test("returns 2 if only the second step is run", () => {
		const onboardingState: OnboardingChecklistItemName[] = ["pipeline_run"];
		const finalStep = "starter_setup_completed";
		const items: OnboardingChecklistItemName[] = [
			"device_verified",
			"pipeline_run",
			"pipeline_run_with_remote_orchestrator"
		];
		const progress = getProgress(onboardingState, items, finalStep);
		expect(progress).toBe(2);
	});

	test("returns 2 if only the finalStep is there", () => {
		const onboardingState: OnboardingChecklistItemName[] = ["starter_setup_completed"];
		const finalStep = "starter_setup_completed";
		const items: OnboardingChecklistItemName[] = ["device_verified", "pipeline_run"];
		const progress = getProgress(onboardingState, items, finalStep);
		expect(progress).toBe(2);
	});
});

describe("checks if the item has downstream items", () => {
	test("returns true if a downstream step is there", () => {
		const itemName = "device_verified";
		const onboardingState: OnboardingChecklistItemName[] = [
			"device_verified",
			"pipeline_run",
			"starter_setup_completed"
		];
		const order: OnboardingChecklistItemName[] = [
			"device_verified",
			"pipeline_run",
			"starter_setup_completed"
		];
		const hasDownStreamFinishded = checkDownstreamStep(itemName, onboardingState, order);
		expect(hasDownStreamFinishded).toBe(true);
	});

	test("returns false if there is no downstream step", () => {
		const itemName = "pipeline_run";
		const onboardingState: OnboardingChecklistItemName[] = ["pipeline_run"];
		const order: OnboardingChecklistItemName[] = ["pipeline_run", "starter_setup_completed"];
		const hasDownStreamFinishded = checkDownstreamStep(itemName, onboardingState, order);
		expect(hasDownStreamFinishded).toBe(false);
	});
});
