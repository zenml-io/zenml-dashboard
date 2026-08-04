import Minus from "@/assets/icons/minus.svg?react";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { ExecutionStatus } from "@/types/pipeline-runs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";

function getPlaceholderSeparatorLabel(runStatus: ExecutionStatus) {
	switch (runStatus) {
		case "cancelled":
			return "skipped steps due to cancellation";
		case "stopped":
			return "skipped steps due to stop";
		default:
			return "skipped steps due to failure";
	}
}

export function TimelinePlaceholderSeparator({ runStatus }: { runStatus: ExecutionStatus }) {
	return (
		<div className="flex w-full items-center gap-1 bg-theme-surface-secondary px-3 py-1">
			<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">
				{getPlaceholderSeparatorLabel(runStatus)}
			</p>
		</div>
	);
}

export function PlaceholderListItem({
	stepName,
	runStatus
}: {
	stepName: string;
	runStatus: ExecutionStatus;
}) {
	const isFailed = runStatus === "failed";
	const isCancelled = runStatus === "cancelled";
	const isCompleted = runStatus === "completed";
	const isStopped = runStatus === "stopped";
	return (
		<div className="flex items-center text-text-sm transition-colors duration-200 data-[selected=true]:bg-theme-surface-tertiary group-data-[state=open]:border-b">
			<div
				style={{ width: "min(var(--timeline-col-width, 240px), 50%)" }}
				className="flex shrink-0 items-center gap-1 border-r border-theme-border-moderate px-3 py-1"
			>
				<div className="size-3" />
				<TooltipProvider>
					{isFailed || isCancelled ? (
						<Minus className="size-3 shrink-0 fill-blue-500/50" />
					) : (
						<ExecutionStatusIcon
							status={isCompleted ? "completed" : isStopped ? "stopped" : "running"}
							className="size-3"
						/>
					)}

					<div className="min-w-0 flex-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									className="max-w-full truncate text-left font-semibold text-theme-text-primary/50"
								>
									{stepName}
								</button>
							</TooltipTrigger>
							<TooltipContent className="z-10" side="right">
								{stepName}
							</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			</div>
			<div className="min-w-0 flex-1 px-1"></div>
		</div>
	);
}
