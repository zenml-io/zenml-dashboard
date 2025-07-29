import Copy from "@/assets/icons/copy.svg?react";
import { getArtifactVersionSnippet } from "@/lib/code-snippets";
import { ArtifactNodePayload } from "@/types/dag-visualizer";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { ArtifactIcon } from "../ArtifactIcon";
import { BaseNode } from "./BaseNode";
import { CopyNodeButton } from "./NodeCopyButton";
import { useSheetContext } from "./sheet-context";

export function ArtifactNodeComponent({ data, selected }: NodeProps<ArtifactNodePayload>) {
	const { openArtifactSheet } = useSheetContext();
	function getTypeFromArtifact(str: string) {
		const parts = str.split(".");
		const lastPart = parts[parts.length - 1];
		return lastPart;
	}

	function handleClick() {
		openArtifactSheet(data.artifact_id);
	}

	return (
		<BaseNode>
			<button
				onClick={handleClick}
				data-selected={!!selected}
				className="group flex h-[50px] min-w-0 max-w-[300px] items-center justify-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 py-1 pl-1 pr-2 transition-all duration-200 hover:border-primary-400 data-[selected=true]:border-primary-500 data-[selected=true]:bg-primary-500"
			>
				<div className="rounded-rounded bg-primary-50 p-0.5 group-data-[selected=true]:bg-white/20">
					<ArtifactIcon
						className="h-4 w-4 fill-primary-400 group-data-[selected=true]:fill-theme-text-negative"
						artifactType={data.type}
					/>
				</div>
				<div className="min-w-0 text-left">
					<p className="truncate text-text-sm font-semibold text-theme-text-brand group-data-[selected=true]:text-theme-text-negative">
						{data.artifact_name}
					</p>

					<p className="truncate text-text-xs text-theme-text-secondary group-data-[selected=true]:text-white/70">
						{/* As artifact_type doesn't correspond to the last part of the string */}
						{getTypeFromArtifact(data.data_type)}
					</p>
				</div>
				<CopyNodeButton
					className="h-4 w-4 shrink-0 rounded-sm hover:bg-primary-100 active:bg-primary-200"
					code={getArtifactVersionSnippet(data.artifact_id)}
					type="artifact"
				>
					<Copy className="h-3 w-3 fill-primary-400" />
					<div className="sr-only">Copy code to load artifact</div>
				</CopyNodeButton>
			</button>
		</BaseNode>
	);
}

export const ArtifactNode = memo(ArtifactNodeComponent);
