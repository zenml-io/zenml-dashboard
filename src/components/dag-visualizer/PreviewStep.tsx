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
import Minus from "@/assets/icons/minus.svg?react";

export function PreviewStepNode({ data }: NodeProps<{ label: string; status: ExecutionStatus }>) {
	const isFailed = data.status === "failed";
	const isCompleted = data.status === "completed";
	return (
		<BaseNode>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex h-[50px] max-w-[300px] items-center gap-1 rounded-md border border-theme-border-moderate bg-theme-surface-primary p-1 pr-2 opacity-50">
							<div className={`rounded-sm ${isFailed ? "bg-blue-50" : "bg-warning-50"} p-0.5`}>
								{isFailed ? (
									<Minus className="h-4 w-4 shrink-0 fill-blue-500" />
								) : (
									<ExecutionStatusIcon
										status={isCompleted ? "completed" : "running"}
										className="h-4 w-4 fill-theme-text-warning"
									/>
								)}
							</div>
							<p className="truncate">{data.label}</p>
						</div>
					</TooltipTrigger>
					<TooltipContent className="z-20 max-w-xs text-center">
						{isFailed ? (
							<>This step will never start because of an upstream error</>
						) : (
							<>
								This is a future step with pending execution.
								<br />
								It may not run if there are upstream errors.
							</>
						)}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</BaseNode>
	);
}
