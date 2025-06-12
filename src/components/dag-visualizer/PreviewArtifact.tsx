import Minus from "@/assets/icons/minus.svg?react";
import { PreviewNodePayload } from "@/types/dag-visualizer";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { NodeProps } from "reactflow";
import { ExecutionStatusIcon } from "../ExecutionStatus";
import { BaseNode } from "./BaseNode";

export function PreviewArtifactNode({ data }: NodeProps<PreviewNodePayload>) {
	const isFailed = data.runStatus === "failed";
	const isCompleted = data.runStatus === "completed";
	const isStopped = data.runStatus === "stopped";
	return (
		<BaseNode>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex h-[50px] min-w-0 max-w-[300px] items-center justify-center gap-1 rounded-rounded border border-primary-100 bg-primary-25 p-1 opacity-50">
							<div className="rounded-rounded bg-primary-50 p-0.5">
								{isFailed ? (
									<Minus className="h-4 w-4 shrink-0 fill-primary-400" />
								) : (
									<ExecutionStatusIcon
										status={isCompleted ? "completed" : isStopped ? "stopped" : "running"}
										className="h-4 w-4 fill-primary-400"
									/>
								)}
							</div>
							<p className="truncate text-text-sm">{data.node_name}</p>
						</div>
					</TooltipTrigger>
					<TooltipContent className="z-20 max-w-xs text-center">
						{isFailed ? (
							<>This artifact was not generated because of an upstream error</>
						) : isStopped ? (
							<>This artifact was not created because the run was stopped</>
						) : (
							<>
								This artifact is not generated yet. It will not be created if the are upstream
								errors.
							</>
						)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</BaseNode>
	);
}
