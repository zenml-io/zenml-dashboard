import { describe, expect, it } from "vitest";
import { EXECUTION_STATUS_FILTER_OPTIONS } from "./execution-status-filter-options";

describe("EXECUTION_STATUS_FILTER_OPTIONS", () => {
	it("includes every execution status plus all", () => {
		expect(EXECUTION_STATUS_FILTER_OPTIONS.map((option) => option.value)).toEqual([
			"all",
			"completed",
			"failed",
			"running",
			"cached",
			"stopped",
			"retried",
			"initializing",
			"provisioning",
			"queued",
			"retrying",
			"resuming",
			"paused",
			"skipped",
			"stopping",
			"cancelling",
			"cancelled"
		]);
	});
});
