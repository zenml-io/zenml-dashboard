import { ExecutionStatus } from "@/types/pipeline-runs";

type DurationIndicatorConfig = {
	earliestStartTime: number;
	totalTimelineSpanMs: number;
	startTimeMs?: number;
	duration: number;
	stepStatus: ExecutionStatus;
};

export function getDurationIndicator({
	earliestStartTime,
	totalTimelineSpanMs,
	startTimeMs,
	duration,
	stepStatus
}: DurationIndicatorConfig) {
	const safeTimelineSpan = Math.max(totalTimelineSpanMs, 1);

	const offsetPercentage = startTimeMs
		? ((startTimeMs - earliestStartTime) / safeTimelineSpan) * 100
		: 0;

	let barWidth = ((duration * 1000) / safeTimelineSpan) * 100;

	if (stepStatus === "running") {
		barWidth = Math.max(100 - offsetPercentage, 1);
	}

	// Ensure minimum width for very short durations
	const minWidthPercent = 0.5;
	if (barWidth < minWidthPercent) {
		barWidth = minWidthPercent;
	}

	return {
		offsetPercentage,
		barWidth
	};
}
