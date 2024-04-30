import { describe, test, expect } from "vitest";
import { getStarterSetupItems } from "./onboarding";

describe("returns the correct items for the starter setup based on the deployment type", () => {
	test("doesnt return connect step for local deployment", () => {
		const isLocal = true;
		const items = getStarterSetupItems(isLocal);
		expect(items).toEqual(["run_first_pipeline"]);
	});

	test("includes the connect step for non-local deployments", () => {
		const isLocal = false;
		const items = getStarterSetupItems(isLocal);
		expect(items).toEqual(["connect_zenml", "run_first_pipeline"]);
	});
});
