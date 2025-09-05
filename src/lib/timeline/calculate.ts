import { TimelineItem } from "./types";

export function calculateEarliestStartTime(timelineItems: TimelineItem[]): number {
	const startTimes = timelineItems
		.map((item) => item.startTimeMs)
		.filter((startTimeMs): startTimeMs is number => startTimeMs !== undefined);

	return startTimes.length > 0 ? Math.min(...startTimes) : 0;
}

export function calculateTotalTimelineSpan(
	timelineItems: TimelineItem[],
	currentTimeMs?: number
): number {
	if (timelineItems.length === 0) {
		return 0;
	}

	const startTimes = timelineItems
		.map((item) => item.startTimeMs)
		.filter((startTimeMs): startTimeMs is number => startTimeMs !== undefined);

	const durations = timelineItems
		.map((item) => item.step.metadata.duration)
		.filter((duration): duration is number => duration !== undefined && duration > 0);

	if (startTimes.length === 0 && durations.length === 0) {
		return 0;
	}

	if (startTimes.length === 0) {
		return Math.max(...durations) * 1000; // Convert seconds to ms
	}

	if (durations.length === 0) {
		return Math.max(...startTimes) - Math.min(...startTimes);
	}

	const earliestStart = Math.min(...startTimes);

	// Calculate end times, using current time for running steps
	const endTimes = timelineItems
		.filter((item) => item.startTimeMs !== undefined)
		.map((item) => {
			if (item.step.metadata.duration !== undefined) {
				// Step has completed, use its actual end time
				return item.startTimeMs! + item.step.metadata.duration * 1000;
			} else if (currentTimeMs !== undefined) {
				// Step is still running, use current time as end time
				return currentTimeMs;
			} else {
				// No current time provided, use start time as fallback
				return item.startTimeMs!;
			}
		});

	const latestEnd = endTimes.length > 0 ? Math.max(...endTimes) : Math.max(...startTimes);

	return latestEnd - earliestStart;
}
