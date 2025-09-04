import { describe, it, expect } from "vitest";
import { calculateEarliestStartTime, calculateTotalTimelineSpan } from "./calculate";
import { TimelineItem } from "./types";

// Helper function to create a mock TimelineItem
function createMockTimelineItem(overrides: Partial<TimelineItem> = {}): TimelineItem {
	return {
		step: {
			node_id: "step-1",
			type: "step",
			id: "step-1",
			name: "Test Step",
			metadata: {
				status: "completed",
				duration: 5,
				startTime: "2023-01-01T10:00:00Z"
			}
		},
		inputs: [],
		outputs: [],
		startTimeMs: 1672574400000, // 2023-01-01T10:00:00Z in milliseconds
		...overrides
	};
}

describe("calculateEarliestStartTime", () => {
	it("should return 0 for empty array", () => {
		const result = calculateEarliestStartTime([]);
		expect(result).toBe(0);
	});

	it("should return the earliest start time when all items have startTimeMs", () => {
		const items = [
			createMockTimelineItem({ startTimeMs: 1000 }),
			createMockTimelineItem({ startTimeMs: 500 }),
			createMockTimelineItem({ startTimeMs: 2000 })
		];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(500);
	});

	it("should ignore items without startTimeMs", () => {
		const items = [
			createMockTimelineItem({ startTimeMs: 1000 }),
			createMockTimelineItem({ startTimeMs: undefined }),
			createMockTimelineItem({ startTimeMs: 500 })
		];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(500);
	});

	it("should return 0 when no items have startTimeMs", () => {
		const items = [
			createMockTimelineItem({ startTimeMs: undefined }),
			createMockTimelineItem({ startTimeMs: undefined })
		];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(0);
	});

	it("should handle single item with startTimeMs", () => {
		const items = [createMockTimelineItem({ startTimeMs: 1500 })];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(1500);
	});

	it("should handle negative start times", () => {
		const items = [
			createMockTimelineItem({ startTimeMs: -1000 }),
			createMockTimelineItem({ startTimeMs: 500 }),
			createMockTimelineItem({ startTimeMs: 2000 })
		];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(-1000);
	});

	it("should handle very large numbers", () => {
		const largeNumber = Number.MAX_SAFE_INTEGER;
		const items = [
			createMockTimelineItem({ startTimeMs: largeNumber }),
			createMockTimelineItem({ startTimeMs: largeNumber - 1 })
		];

		const result = calculateEarliestStartTime(items);
		expect(result).toBe(largeNumber - 1);
	});
});

describe("calculateTotalTimelineSpan", () => {
	it("should return 0 for empty array", () => {
		const result = calculateTotalTimelineSpan([]);
		expect(result).toBe(0);
	});

	it("should calculate span using start times and durations", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 5 }
				}
			}),
			createMockTimelineItem({
				startTimeMs: 2000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 3 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		// First item: starts at 1000ms, ends at 1000 + 5000 = 6000ms
		// Second item: starts at 2000ms, ends at 2000 + 3000 = 5000ms
		// Span: 6000 - 1000 = 5000ms
		expect(result).toBe(5000);
	});

	it("should handle items with only durations (no start times)", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 10 }
				}
			}),
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 5 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		expect(result).toBe(10000); // 10 seconds * 1000
	});

	it("should handle items with only start times (no durations)", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			}),
			createMockTimelineItem({
				startTimeMs: 3000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);

		expect(result).toBe(2000); // 3000 - 1000
	});

	it("should return 0 when no items have start times or durations", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			}),
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		expect(result).toBe(0);
	});

	it("should filter out durations that are 0 or negative", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 0 }
				}
			}),
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: -5 }
				}
			}),
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 10 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		expect(result).toBe(10000); // 10 seconds * 1000
	});

	it("should handle mixed scenarios with some items having both start times and durations", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 5 }
				}
			}),
			createMockTimelineItem({
				startTimeMs: 2000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			}),
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 8 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		// First item: starts at 1000ms, ends at 1000 + 5000 = 6000ms
		// Second item: starts at 2000ms, no duration
		// Third item: no start time, duration 8s = 8000ms
		// Latest end time: 6000ms (from first item)
		// Earliest start time: 1000ms
		// Span: 6000 - 1000 = 5000ms
		expect(result).toBe(5000);
	});

	it("should handle edge case where end times array is empty", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			}),
			createMockTimelineItem({
				startTimeMs: 3000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: undefined }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		// No items have both start time and duration, so endTimes array is empty
		// Should fall back to max start time - min start time
		expect(result).toBe(2000); // 3000 - 1000
	});

	it("should handle single item with both start time and duration", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 5 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		// Single item: starts at 1000ms, ends at 1000 + 5000 = 6000ms
		// Span: 6000 - 1000 = 5000ms
		expect(result).toBe(5000);
	});

	it("should handle very large durations", () => {
		const largeDuration = 3600; // 1 hour in seconds
		const items = [
			createMockTimelineItem({
				startTimeMs: undefined,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: largeDuration }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		expect(result).toBe(largeDuration * 1000); // 3600000ms
	});

	it("should handle fractional durations", () => {
		const items = [
			createMockTimelineItem({
				startTimeMs: 1000,
				step: {
					...createMockTimelineItem().step,
					metadata: { ...createMockTimelineItem().step.metadata, duration: 2.5 }
				}
			})
		];

		const result = calculateTotalTimelineSpan(items);
		// Item: starts at 1000ms, ends at 1000 + 2500 = 3500ms
		// Span: 3500 - 1000 = 2500ms
		expect(result).toBe(2500);
	});
});
