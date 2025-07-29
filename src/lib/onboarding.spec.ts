import { OnboardingChecklistItemName, OnboardingResponse } from "@/types/onboarding";
import { describe, expect, test } from "vitest";
import { checkDownstreamStep, getProgress, getSetupItems, getOnboardingLength } from "./onboarding";

describe("returns the correct items based on the deployment type", () => {
	test("doesnt return connect step for local deployment", () => {
		const isLocal = true;
		const items = getSetupItems(isLocal);
		expect(items).toEqual(["pipeline_run"]);
	});

	test("includes the connect step for non-local deployments", () => {
		const isLocal = false;
		const items = getSetupItems(isLocal);
		expect(items).toEqual(["device_verified", "pipeline_run"]);
	});
});

describe("returns the correct progress, depending on the current state", () => {
	test("returns 2 if the first two steps are done", () => {
		const state: OnboardingResponse = ["device_verified", "pipeline_run"];
		const progress = getProgress(state, false);
		expect(progress).toBe(2);
	});

	test("returns 0 if no steps are done", () => {
		const onboardingState: OnboardingChecklistItemName[] = [];
		const progress = getProgress(onboardingState, false);
		expect(progress).toBe(0);
	});

	test("returns 2 if only the second step is run", () => {
		const onboardingState: OnboardingChecklistItemName[] = ["pipeline_run"];
		const progress = getProgress(onboardingState, false);
		expect(progress).toBe(2);
	});

	test("returns correct value if flow is local", () => {
		const onboardingState: OnboardingChecklistItemName[] = ["device_verified"];
		const progress = getProgress(onboardingState, true);
		expect(progress).toBe(0);
	});
});

describe("checks if the item has downstream items", () => {
	test("returns true if a downstream step is there", () => {
		const itemName = "device_verified";
		const onboardingState: OnboardingChecklistItemName[] = ["device_verified", "pipeline_run"];
		const hasDownStreamFinishded = checkDownstreamStep(itemName, onboardingState, false);
		expect(hasDownStreamFinishded).toBe(true);
	});

	test("returns false if there is no downstream step", () => {
		const itemName = "pipeline_run";
		const onboardingState: OnboardingChecklistItemName[] = ["pipeline_run"];
		const hasDownStreamFinishded = checkDownstreamStep(itemName, onboardingState, false);
		expect(hasDownStreamFinishded).toBe(false);
	});
	test("returns correct value if starter setup is local", () => {
		const itemName = "device_verified";
		const onboardingState: OnboardingChecklistItemName[] = ["device_verified", "pipeline_run"];
		const hasDownStreamFinishded = checkDownstreamStep(itemName, onboardingState, true);
		expect(hasDownStreamFinishded).toBe(false);
	});

	test("only final step is there", () => {
		const itemName: OnboardingChecklistItemName = "pipeline_run";
		const onboarding_state: OnboardingChecklistItemName[] = ["oss_onboarding_completed"];
		const hasDownStreamFinished = checkDownstreamStep(itemName, onboarding_state, false);
		expect(hasDownStreamFinished).toBe(true);
	});
});

describe("checks if the correct length is returned", () => {
	test("returns correct value for local starter setup", () => {
		const isLocal = true;
		const items = getOnboardingLength(isLocal);
		expect(items).toBe(1);
	});
	test("returns correct value for non-local starter setup", () => {
		const isLocal = false;
		const items = getOnboardingLength(isLocal);
		expect(items).toBe(2);
	});
});
