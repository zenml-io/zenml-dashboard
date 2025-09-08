import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { RawStepNode } from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";

export function TimelineStepNode({
	step,
	runStatus
}: {
	step: RawStepNode;
	runStatus: ExecutionStatus;
}) {
	const isStatusUnknown = getIsStatusUnknown(step.metadata.status, runStatus);

	return (
		<div className="flex h-6 max-w-[150px] items-center gap-1 rounded-md border border-theme-border-moderate px-1 text-text-xs transition-all duration-200">
			<ExecutionStatusIcon
				status={isStatusUnknown ? "unknown" : step.metadata.status}
				className="h-4 w-4 shrink-0"
			/>
			<div className="truncate font-semibold">{step.name}</div>
		</div>
	);
}
