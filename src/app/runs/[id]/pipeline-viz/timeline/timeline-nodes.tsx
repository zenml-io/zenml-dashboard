import { ArtifactIcon } from "@/components/ArtifactIcon";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";

export function TimelineStepNode({ step }: { step: RawStepNode }) {
	return (
		<div className="flex h-6 max-w-[150px] items-center gap-1 rounded-md border border-theme-border-moderate px-1 text-text-xs transition-all duration-200 hover:border-neutral-400 hover:shadow-md">
			<ExecutionStatusIcon className="size-3 shrink-0" status={step.metadata.status} />
			<div className="truncate font-semibold">{step.name}</div>
		</div>
	);
}

export function TimelineArtifactNode({ artifact }: { artifact: RawArtifactNode }) {
	return (
		<div className="flex h-6 max-w-[150px] items-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 px-1 transition-all duration-200 hover:border-primary-400">
			<ArtifactIcon
				artifactType={artifact.metadata.type}
				className="size-3 shrink-0 fill-primary-400"
			/>
			<div className="truncate text-text-xs font-semibold text-theme-text-brand">
				{artifact.name}
			</div>
		</div>
	);
}
