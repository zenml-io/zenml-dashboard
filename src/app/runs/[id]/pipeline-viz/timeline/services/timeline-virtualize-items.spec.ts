import { describe, it, expect } from "vitest";
import { virtualizeTimelineItems } from "./timeline-virtualize-items";
import { createMockTimelineItem } from "@/lib/timeline/calculate.spec";
import type { Node } from "@/types/dag-visualizer";
import type { TimelineItem } from "@/lib/timeline/types";

// Helper to create a minimal placeholder Step Node
function createMockPlaceholderStep(name: string, id: string): Node {
	return {
		// The test does not rely on Node fields beyond identity/order.
		// Cast to Node to satisfy typing without pulling the full schema shape.
		id,
		node_id: id,
		type: "step",
		name,
		metadata: {
			status: "stopped"
		}
	} as unknown as Node;
}

describe("virtualizeTimelineItems", () => {
	it("returns only timeline items when run is not failed", () => {
		const timelineItems: TimelineItem[] = [
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "A" } }),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "B" } })
		];

		const result = virtualizeTimelineItems({
			timelineItems,
			runStatus: "completed",
			placeholderSteps: []
		});

		expect(result).toHaveLength(2);
		expect(result.every((i) => i.type === "timeline")).toBe(true);
		// Preserve order and reference for items
		const first = result[0];
		const second = result[1];
		if (first.type === "timeline") {
			expect(first.item).toBe(timelineItems[0]);
		}
		if (second.type === "timeline") {
			expect(second.item).toBe(timelineItems[1]);
		}
	});

	it("includes separator and placeholders when run failed", () => {
		const timelineItems: TimelineItem[] = [
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "First" } }),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "Second" } })
		];
		const placeholders: Node[] = [
			createMockPlaceholderStep("Skipped One", "p1"),
			createMockPlaceholderStep("Skipped Two", "p2")
		];

		const result = virtualizeTimelineItems({
			timelineItems,
			runStatus: "failed",
			placeholderSteps: placeholders
		});

		// 2 timeline + 1 separator + 2 placeholders
		expect(result).toHaveLength(5);
		// Timeline items first
		expect(result[0].type).toBe("timeline");
		if (result[0].type === "timeline") {
			expect(result[0].item).toBe(timelineItems[0]);
		}
		expect(result[1].type).toBe("timeline");
		if (result[1].type === "timeline") {
			expect(result[1].item).toBe(timelineItems[1]);
		}
		// Separator in the middle
		expect(result[2].type).toBe("separator");
		// Placeholders appended, preserving order
		expect(result[3].type).toBe("placeholder");
		if (result[3].type === "placeholder") {
			expect(result[3].item).toBe(placeholders[0]);
		}
		expect(result[4].type).toBe("placeholder");
		if (result[4].type === "placeholder") {
			expect(result[4].item).toBe(placeholders[1]);
		}
	});

	it("returns only separator when failed with no placeholders", () => {
		const result = virtualizeTimelineItems({
			timelineItems: [],
			runStatus: "failed",
			placeholderSteps: []
		});

		expect(result).toHaveLength(0);
	});

	it("returns empty array when not failed and no items", () => {
		const result = virtualizeTimelineItems({
			timelineItems: [],
			runStatus: "running",
			placeholderSteps: []
		});

		expect(result).toEqual([]);
	});

	it("preserves order of timeline items and placeholders", () => {
		const timelineItems: TimelineItem[] = [
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "1" } }),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "2" } }),
			createMockTimelineItem({ step: { ...createMockTimelineItem().step, name: "3" } })
		];
		const placeholders: Node[] = [
			createMockPlaceholderStep("X", "x"),
			createMockPlaceholderStep("Y", "y"),
			createMockPlaceholderStep("Z", "z")
		];

		const result = virtualizeTimelineItems({
			timelineItems,
			runStatus: "failed",
			placeholderSteps: placeholders
		});

		expect(result.map((r) => r.type)).toEqual([
			"timeline",
			"timeline",
			"timeline",
			"separator",
			"placeholder",
			"placeholder",
			"placeholder"
		]);
		// Check specific order integrity
		const r0 = result[0];
		const r1 = result[1];
		const r2 = result[2];
		const r3 = result[3];
		const r4 = result[4];
		const r5 = result[5];
		const r6 = result[6];
		if (r0.type === "timeline") expect(r0.item).toBe(timelineItems[0]);
		if (r1.type === "timeline") expect(r1.item).toBe(timelineItems[1]);
		if (r2.type === "timeline") expect(r2.item).toBe(timelineItems[2]);
		expect(r3.type).toBe("separator");
		if (r4.type === "placeholder") expect(r4.item).toBe(placeholders[0]);
		if (r5.type === "placeholder") expect(r5.item).toBe(placeholders[1]);
		if (r6.type === "placeholder") expect(r6.item).toBe(placeholders[2]);
	});
});
