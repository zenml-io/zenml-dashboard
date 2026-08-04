import { describe, expect, it } from "vitest";
import {
	getTimelineStatusFilterLabel,
	TIMELINE_STATUS_FILTER_OPTIONS
} from "./timeline-status-filter";

describe("timeline status filters", () => {
	it("includes Not started alongside the standard execution statuses", () => {
		expect(TIMELINE_STATUS_FILTER_OPTIONS).toEqual(
			expect.arrayContaining([
				{ value: "all", label: "All" },
				{ value: "not_started", label: "Not started" },
				{ value: "failed", label: "Failed" }
			])
		);
	});

	it("returns the display label for each filter value", () => {
		expect(getTimelineStatusFilterLabel("not_started")).toBe("Not started");
		expect(getTimelineStatusFilterLabel("failed")).toBe("Failed");
	});
});
