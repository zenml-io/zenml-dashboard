import { ArtifactVersionBody } from "@/types/artifact-versions";
import { ArtifactNodeDetails } from "@/types/pipeline-runs";
import { NodeProps } from "reactflow";
import { ArtifactIcon } from "../ArtifactIcon";
import { BaseNode } from "./BaseNode";

export function ArtifactNode({ data, selected }: NodeProps<ArtifactNodeDetails>) {
	return (
		<BaseNode>
			{/* <ArtifactSheet onOpenChange={openChangeHandler} artifactVersionId={data.execution_id}> */}
			<button
				data-selected={!!selected}
				className="group flex h-[50px] min-w-0 max-w-[300px] items-center justify-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 py-1 pl-1 pr-2 transition-all duration-200 hover:border-primary-400 data-[selected=true]:border-primary-500 data-[selected=true]:bg-primary-500"
			>
				<div className="rounded-rounded bg-primary-50 p-0.5 group-data-[selected=true]:bg-white/20">
					<ArtifactIcon
						className="h-4 w-4 fill-primary-400 group-data-[selected=true]:fill-theme-text-negative"
						artifactType={data.artifact_type as ArtifactVersionBody["type"]}
					/>
				</div>
				<div className="min-w-0 text-left">
					<p className="truncate text-text-sm font-semibold text-theme-text-brand group-data-[selected=true]:text-theme-text-negative">
						{data.name}
					</p>
					<p className="truncate text-text-xs text-theme-text-secondary group-data-[selected=true]:text-white/70">
						{data.artifact_data_type}
					</p>
				</div>
			</button>
			{/* </ArtifactSheet> */}
		</BaseNode>
	);
}
