import { getExecutionStatusBgColor } from "@/components/ExecutionStatus";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { getDurationIndicator } from "../services/timeline-duration-calculation";

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
	const { offsetPercentage, barWidth } = getDurationIndicator({
		earliestStartTime,
		totalTimelineSpanMs,
		startTimeMs,
		duration,
		stepStatus
	});

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
