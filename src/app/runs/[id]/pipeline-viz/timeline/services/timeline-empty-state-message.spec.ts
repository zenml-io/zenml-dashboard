import { describe, it, expect } from "vitest";
import { getEmptyStateMessage } from "./timeline-empty-state-message";
import { createMockTimelineItem } from "@/lib/timeline/calculate.spec";

describe("getEmptyStateMessage", () => {
	it("returns 'No steps available' when timeline is empty (any search)", () => {
		const result = getEmptyStateMessage([], "anything");
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
		const result = getEmptyStateMessage(timelineItems, "nonexistent");
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
		const result = getEmptyStateMessage(timelineItems, searchString);
		expect(result).toEqual({
			title: "No steps found",
			description: `No steps found that match the search "${searchString}".`
		});
	});
});
