import { TimelineItem } from "./types";

export function calculateEarliestStartTime(timelineItems: TimelineItem[]): number {
	const startTimes = timelineItems
		.map((item) => item.startTimeMs)
		.filter((startTimeMs): startTimeMs is number => startTimeMs !== undefined);

	return startTimes.length > 0 ? Math.min(...startTimes) : 0;
}

export function calculateTotalTimelineSpan(timelineItems: TimelineItem[]): number {
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

	const endTimes = timelineItems
		.filter((item) => item.startTimeMs !== undefined && item.step.metadata.duration !== undefined)
		.map((item) => item.startTimeMs! + item.step.metadata.duration! * 1000);

	const latestEnd = endTimes.length > 0 ? Math.max(...endTimes) : Math.max(...startTimes);

	return latestEnd - earliestStart;
}
