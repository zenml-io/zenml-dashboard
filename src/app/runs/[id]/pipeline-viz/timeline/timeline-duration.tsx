import { getExecutionStatusBgColor } from "@/components/ExecutionStatus";
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
	// Calculate offset percentage based on start time relative to earliest start time
	const offsetPercentage = startTimeMs
		? ((startTimeMs - earliestStartTime) / totalTimelineSpanMs) * 100
		: 0;

	// Calculate bar width percentage based on duration
	let barWidth = ((duration * 1000) / totalTimelineSpanMs) * 100;

	// Ensure minimum width for very short durations
	const minWidthPercent = 0.5;
	if (barWidth < minWidthPercent) {
		barWidth = minWidthPercent;
	}

	return (
		<div className="rounded relative h-1 w-full overflow-hidden">
			<div
				className={`absolute h-full rounded-rounded ${getExecutionStatusBgColor(stepStatus)}`}
				style={{
					left: `${offsetPercentage}%`,
					width: `${barWidth}%`
				}}
			/>
		</div>
	);
}
