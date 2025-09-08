import { describe, it, expect } from "vitest";
import { filterTimelineItems } from "./timeline-search";
import { createMockPlaceholderStep, createMockTimelineItem } from "@/lib/timeline/calculate.spec";
import type { VirtualizedItem, VirtualizedStep } from "@/lib/timeline/types";

// Helper function to create a mock artifact node
function createMockArtifactNode(name: string, nodeId: string) {
	return {
		node_id: nodeId,
		type: "artifact" as const,
		name,
		metadata: {
			type: "DataArtifact" as const,
			data_type: "string" as const,
			save_type: "string" as const
		}
	};
}

describe("filterTimelineItems", () => {
	it("returns all items (including separators) when search is empty", () => {
		const items: VirtualizedItem[] = [
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Data Processing" }
				})
			},
			{ type: "separator" as const },
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Pending Step", "ph-1") },
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Model Training" }
				})
			}
		];

		const result = filterTimelineItems(items, "");
		expect(result).toEqual(items);
	});

	it("filters by step name (case-insensitive) on timeline items", () => {
		const items: VirtualizedItem[] = [
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Data Processing" }
				})
			},
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Model Training" }
				})
			},
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Data Validation" }
				})
			},
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Pending Step", "ph-1") },
			{ type: "separator" as const }
		];

		const result = filterTimelineItems(items, "data");
		expect(
			result.filter((i): i is VirtualizedStep => i.type === "timeline").map((i) => i.item.step.name)
		).toEqual(["Data Processing", "Data Validation"]);
		expect(result.find((i) => i.type === "separator")).toBeUndefined();
	});

	it("filters by input artifact names (case-insensitive) on timeline items", () => {
		const items: VirtualizedItem[] = [
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Step 1" },
					inputs: [createMockArtifactNode("RawData", "input-1")]
				})
			},
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Step 2" },
					inputs: [createMockArtifactNode("ProcessedData", "input-2")]
				})
			}
		];

		const result = filterTimelineItems(items, "rawdata");
		expect(
			result.filter((i): i is VirtualizedStep => i.type === "timeline").map((i) => i.item.step.name)
		).toEqual(["Step 1"]);
	});

	it("filters by output artifact names (case-insensitive) on timeline items", () => {
		const items: VirtualizedItem[] = [
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Step 1" },
					outputs: [createMockArtifactNode("ModelOutput", "output-1")]
				})
			},
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Step 2" },
					outputs: [createMockArtifactNode("Metrics", "output-2")]
				})
			}
		];

		const result = filterTimelineItems(items, "modeloutput");
		expect(
			result.filter((i): i is VirtualizedStep => i.type === "timeline").map((i) => i.item.step.name)
		).toEqual(["Step 1"]);
	});

	it("filters placeholder items by placeholder name (case-insensitive)", () => {
		const items: VirtualizedItem[] = [
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Waiting For Data", "ph-1") },
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Queued", "ph-2") },
			{ type: "separator" as const }
		];

		const result = filterTimelineItems(items, "waiting for");
		expect(result.length).toBe(1);
		if (result[0].type === "placeholder") {
			expect(result[0].item.name).toBe("Waiting For Data");
		} else {
			throw new Error("Expected a placeholder result");
		}
	});

	it("excludes separators when search is non-empty", () => {
		const items: VirtualizedItem[] = [
			{ type: "separator" as const },
			{
				type: "timeline" as const,
				item: createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "Alpha" } })
			},
			{ type: "separator" as const },
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Beta", "ph-1") }
		];

		const result = filterTimelineItems(items, "a");
		expect(result.find((i) => i.type === "separator")).toBeUndefined();
	});

	it("returns empty array when no items match", () => {
		const items: VirtualizedItem[] = [
			{
				type: "timeline" as const,
				item: createMockTimelineItem({
					step: { ...createMockTimelineItem().step, name: "Data Processing" }
				})
			},
			{ type: "placeholder" as const, item: createMockPlaceholderStep("Queued", "ph-1") },
			{ type: "separator" as const }
		];

		const result = filterTimelineItems(items, "nonexistent");
		expect(result).toEqual([]);
	});

	it("handles empty virtualized items array", () => {
		const result = filterTimelineItems([], "search");
		expect(result).toEqual([]);
	});
});
