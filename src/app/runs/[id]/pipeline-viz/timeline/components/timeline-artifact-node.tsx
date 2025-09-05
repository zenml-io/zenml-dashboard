import { ArtifactIcon } from "@/components/ArtifactIcon";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
import { RawArtifactNode } from "@/types/dag-visualizer";

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
