import { ArtifactIcon } from "@/components/ArtifactIcon";
import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";
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

export function TimelineArtifactNode({ artifact }: { artifact: RawArtifactNode }) {
	const { openArtifactSheet, sheetState } = useSheetContext();

	function handleClick() {
		if (!artifact.id) return;
		openArtifactSheet(artifact.id);
	}

	return (
		<button
			data-selected={sheetState.lastContent?.id === artifact.id && sheetState.isOpen}
			onClick={handleClick}
			className="group flex h-6 max-w-[150px] items-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 px-1 transition-all duration-200 hover:border-primary-400 data-[selected=true]:border-primary-500 data-[selected=true]:bg-primary-500"
		>
			<div className="rounded-rounded bg-primary-50 p-0.5 group-data-[selected=true]:bg-white/20">
				<ArtifactIcon
					artifactType={artifact.metadata.type}
					className="size-3 shrink-0 fill-primary-400 group-data-[selected=true]:fill-theme-text-negative"
				/>
			</div>
			<div className="truncate text-text-xs font-semibold text-theme-text-brand group-data-[selected=true]:text-theme-text-negative">
				{artifact.name}
			</div>
		</button>
	);
}
