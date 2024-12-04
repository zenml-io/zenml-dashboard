import Copy from "@/assets/icons/copy.svg?react";
import { getArtifactVersionSnippet } from "@/lib/code-snippets";
import { ArtifactVersion } from "@/types/artifact-versions";
import { NodeProps, useStore } from "reactflow";
import { ArtifactIcon } from "../ArtifactIcon";
import { ArtifactSheet } from "../artifacts/artifact-node-sheet";
import { BaseNode } from "./BaseNode";
import { CopyNodeButton } from "./NodeCopyButton";

export function ArtifactNode({ data, selected }: NodeProps<ArtifactVersion & { name: string }>) {
	const { unselectNodesAndEdges } = useStore((state) => ({
		unselectNodesAndEdges: state.unselectNodesAndEdges
	}));

	function openChangeHandler(isOpen: boolean) {
		if (!isOpen) {
			// this is a hack to make sure the unselectNodesAndEdges is called after the artifact sheet is closed
			setTimeout(() => {
				unselectNodesAndEdges();
			}, 100);
		}
	}

	function getTypeFromArtifact(str: string) {
		const parts = str.split(".");
		const lastPart = parts[parts.length - 1];
		return lastPart;
	}

	return (
		<BaseNode>
			<ArtifactSheet onOpenChange={openChangeHandler} artifactVersionId={data.id}>
				<button
					data-selected={!!selected}
					className="group flex h-[50px] min-w-0 max-w-[300px] items-center justify-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 py-1 pl-1 pr-2 transition-all duration-200 hover:border-primary-400 data-[selected=true]:border-primary-500 data-[selected=true]:bg-primary-500"
				>
					<div className="rounded-rounded bg-primary-50 p-0.5 group-data-[selected=true]:bg-white/20">
						<ArtifactIcon
							className="h-4 w-4 fill-primary-400 group-data-[selected=true]:fill-theme-text-negative"
							artifactType={data.body?.type || "BaseArtifact"}
						/>
					</div>
					<div className="min-w-0 text-left">
						<p className="truncate text-text-sm font-semibold text-theme-text-brand group-data-[selected=true]:text-theme-text-negative">
							{data.name}
						</p>

						<p className="truncate text-text-xs text-theme-text-secondary group-data-[selected=true]:text-white/70">
							{/* As artifact_type doesn't correspond to the last part of the string */}
							{getTypeFromArtifact(data.body?.data_type.attribute || "")}
						</p>
					</div>
					<CopyNodeButton
						className="h-4 w-4 shrink-0 rounded-sm hover:bg-primary-100 active:bg-primary-200"
						code={getArtifactVersionSnippet(data.id)}
						type="artifact"
					>
						<Copy className="h-3 w-3 fill-primary-400" />
						<div className="sr-only">Copy code to load artifact</div>
					</CopyNodeButton>
				</button>
			</ArtifactSheet>
		</BaseNode>
	);
}
