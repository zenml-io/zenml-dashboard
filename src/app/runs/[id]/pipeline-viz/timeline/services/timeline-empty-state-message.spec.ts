import { describe, it, expect } from "vitest";
import { getEmptyStateMessage } from "./timeline-empty-state-message";
import { createMockTimelineItem } from "@/lib/timeline/calculate.spec";

describe("getEmptyStateMessage", () => {
	it("returns 'No steps available' when timeline is empty (any search)", () => {
		const result = getEmptyStateMessage([], "anything", "failed");
		expect(result).toEqual({
			title: "No steps available",
			description: "This pipeline run doesn't contain any steps to display."
		});
	});

	it("returns 'No steps found' when items exist but search has no matches", () => {
		const timelineItems = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			}),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "Model Training" } })
		];
		const result = getEmptyStateMessage(timelineItems, "nonexistent", "all");
		expect(result).toEqual({
			title: "No steps found",
			description: 'No steps found that match the search "nonexistent".'
		});
	});

	it("preserves the exact search string in the description", () => {
		const timelineItems = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			})
		];
		const searchString = "  spaced  search  ";
		const result = getEmptyStateMessage(timelineItems, searchString, "all");
		expect(result).toEqual({
			title: "No steps found",
			description: `No steps found that match the search "${searchString}".`
		});
	});

	it("returns status-specific message when status filter has no matches", () => {
		const timelineItems = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			})
		];

		const result = getEmptyStateMessage(timelineItems, "", "failed");

		expect(result).toEqual({
			title: "No steps found",
			description: 'No steps found with the status "failed".'
		});
	});

	it("returns combined search and status message when both filters have no matches", () => {
		const timelineItems = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			})
		];

		const result = getEmptyStateMessage(timelineItems, "trainer", "failed");

		expect(result).toEqual({
			title: "No steps found",
			description: 'No failed steps found that match the search "trainer".'
		});
	});
});
