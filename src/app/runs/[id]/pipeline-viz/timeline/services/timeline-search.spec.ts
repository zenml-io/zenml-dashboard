import { describe, it, expect } from "vitest";
import { filterTimelineItems } from "./timeline-search";
import { createMockTimelineItem } from "@/lib/timeline/calculate.spec";

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
	it("returns all items when search is empty", () => {
		const items = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			}),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "Model Training" } })
		];

		const result = filterTimelineItems(items, "");
		expect(result).toEqual(items);
	});

	it("filters by step name (case-insensitive)", () => {
		const items = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			}),
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Model Training" }
			}),
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Validation" }
			})
		];

		const result = filterTimelineItems(items, "data");
		expect(result.map((i) => i.step.name)).toEqual(["Data Processing", "Data Validation"]);
	});

	it("filters by input artifact names (case-insensitive)", () => {
		const items = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Step 1" },
				inputs: [createMockArtifactNode("RawData", "input-1")]
			}),
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Step 2" },
				inputs: [createMockArtifactNode("ProcessedData", "input-2")]
			})
		];

		const result = filterTimelineItems(items, "rawdata");
		expect(result.map((i) => i.step.name)).toEqual(["Step 1"]);
	});

	it("filters by output artifact names (case-insensitive)", () => {
		const items = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Step 1" },
				outputs: [createMockArtifactNode("ModelOutput", "output-1")]
			}),
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Step 2" },
				outputs: [createMockArtifactNode("Metrics", "output-2")]
			})
		];

		const result = filterTimelineItems(items, "modeloutput");
		expect(result.map((i) => i.step.name)).toEqual(["Step 1"]);
	});

	it("returns empty array when no items match", () => {
		const items = [
			createMockTimelineItem({
				step: { ...createMockTimelineItem().step, name: "Data Processing" }
			}),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "Model Training" } })
		];

		const result = filterTimelineItems(items, "nonexistent");
		expect(result).toEqual([]);
	});

	it("handles empty timeline items array", () => {
		const result = filterTimelineItems([], "search");
		expect(result).toEqual([]);
	});
});
