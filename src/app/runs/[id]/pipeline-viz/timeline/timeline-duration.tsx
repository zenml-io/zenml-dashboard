import { getExecutionStatusBgColor } from "@/components/ExecutionStatus";
import { secondsToTimeString } from "@/lib/dates";
import { ExecutionStatus } from "@/types/pipeline-runs";

type Props = {
	duration: number;
	maxDuration: number;
	startTimeMs?: number;
	earliestStartTime: number;
	stepStatus: ExecutionStatus;
};

export function TimelineDurationIndicator({
	duration,
	maxDuration,
	startTimeMs,
	earliestStartTime,
	stepStatus
}: Props) {
	const minBarWidth = 4;
	const timeScale = 2; // 0.5px per second for timeline offset

	// Calculate duration bar width
	let barWidth = 0;
	if (maxDuration > 0 && duration > 0) {
		const ratio = duration / maxDuration;
		const baseWidth = 80;
		barWidth = Math.max(minBarWidth, ratio * baseWidth);
	}

	// Calculate timeline offset (left margin)
	let leftOffset = 0;
	if (startTimeMs !== undefined && earliestStartTime > 0) {
		const offsetMs = startTimeMs - earliestStartTime;
		const offsetSeconds = offsetMs / 1000; // Convert milliseconds to seconds
		leftOffset = offsetSeconds * timeScale;
	}

	return (
		<div className="flex items-center gap-1" style={{ marginLeft: `${leftOffset}px` }}>
			<div
				className={`h-1 rounded-sm ${getExecutionStatusBgColor(stepStatus)}`}
				style={{ width: `${barWidth}px` }}
			/>
			<div className="text-text-xs text-theme-text-secondary">{secondsToTimeString(duration)}</div>
		</div>
	);
}
