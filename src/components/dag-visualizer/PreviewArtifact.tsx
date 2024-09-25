import { ExecutionStatus } from "@/types/pipeline-runs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { NodeProps } from "reactflow";
import { ExecutionStatusIcon } from "../ExecutionStatus";
import { BaseNode } from "./BaseNode";

export function PreviewArtifactNode({
	data
}: NodeProps<{ label: string; status: ExecutionStatus }>) {
	const isFailed = data.status === "failed";
	const isCompleted = data.status === "completed";
	return (
		<BaseNode>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex h-[50px] min-w-0 max-w-[300px] items-center justify-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 p-1 opacity-50">
							<div className="rounded-rounded bg-primary-50 p-0.5">
								<ExecutionStatusIcon
									status={isFailed ? "failed" : isCompleted ? "completed" : "running"}
									className="h-4 w-4 fill-primary-400"
								/>
							</div>
							<p className="truncate">{data.label}</p>
						</div>
					</TooltipTrigger>
					<TooltipContent className="z-20 max-w-xs text-center">
						This artifact is not generated yet. It will not be created if the preceding steps fail.
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</BaseNode>
	);
}
