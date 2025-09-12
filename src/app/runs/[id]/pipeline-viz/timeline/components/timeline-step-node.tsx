import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
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
	const { openStepSheet, sheetState } = useSheetContext();

	function handleClick() {
		if (!step.id) return;
		openStepSheet(step.id);
	}

	const isStatusUnknown = getIsStatusUnknown(step.metadata.status, runStatus);

	return (
		<button
			data-selected={sheetState.lastContent?.id === step.id && sheetState.isOpen}
			onClick={handleClick}
			className="flex h-6 max-w-[150px] items-center gap-1 rounded-md border border-theme-border-moderate px-1 text-text-xs transition-all duration-200 hover:border-neutral-400 hover:shadow-md data-[selected=true]:border-theme-border-bold data-[selected=true]:shadow-md"
		>
			<ExecutionStatusIcon
				status={isStatusUnknown ? "unknown" : step.metadata.status}
				className="h-4 w-4 shrink-0"
			/>
			<div className="truncate font-semibold">{step.name}</div>
		</button>
	);
}
