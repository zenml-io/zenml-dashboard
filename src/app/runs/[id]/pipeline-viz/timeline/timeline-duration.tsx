import { getExecutionStatusBgColor } from "@/components/ExecutionStatus";
import { secondsToTimeString } from "@/lib/dates";
import { ExecutionStatus } from "@/types/pipeline-runs";

type Props = {
	duration: number;
	startTimeMs?: number;
	earliestStartTime: number;
	stepStatus: ExecutionStatus;
	totalTimelineSpanMs: number;
};

export function TimelineDurationIndicator({
	duration,
	startTimeMs,
	earliestStartTime,
	stepStatus,
	totalTimelineSpanMs
}: Props) {
	// Calculate duration percentage of total timeline span
	const durationMs = duration * 1000; // Convert seconds to milliseconds
	const durationPercentage = totalTimelineSpanMs > 0 ? (durationMs / totalTimelineSpanMs) * 100 : 0;

	// Calculate offset percentage - if no startTimeMs, start from beginning (0%)
	// This ensures steps without start times still show their duration bars
	const offsetMs =
		startTimeMs !== undefined && earliestStartTime > 0 ? startTimeMs - earliestStartTime : 0;
	const offsetPercentage = totalTimelineSpanMs > 0 ? (offsetMs / totalTimelineSpanMs) * 100 : 0;

	// Ensure we always show the duration bar, even for cached steps (0 duration)
	const barWidth = duration > 0 ? `${Math.max(0.1, durationPercentage)}%` : "4px";

	return (
		<div
			className="flex w-full items-center gap-1"
			style={{
				marginLeft: `${Math.max(0, offsetPercentage)}%`,
				width: "100%"
			}}
		>
			<div
				className={`h-1 rounded-sm ${getExecutionStatusBgColor(stepStatus)}`}
				style={{
					width: barWidth,
					minWidth: "4px",
					maxWidth: "100%"
				}}
			/>
			<div className="ml-1 whitespace-nowrap text-text-xs text-theme-text-secondary">
				{secondsToTimeString(duration)}
			</div>
		</div>
	);
}
