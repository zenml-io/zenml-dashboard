import Minus from "@/assets/icons/minus.svg?react";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { ExecutionStatus } from "@/types/pipeline-runs";

export function TimelinePlaceholderSeparator() {
	return (
		<div className="flex w-full items-center gap-1 bg-theme-surface-secondary px-3 py-1">
			<p className="text-text-xs font-semibold uppercase text-theme-text-tertiary">
				skipped steps due to failure
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
	const isCompleted = runStatus === "completed";
	const isStopped = runStatus === "stopped";
	return (
		<div className="flex items-center text-text-sm transition-colors duration-200 data-[selected=true]:bg-theme-surface-tertiary group-data-[state=open]:border-b">
			<div className="flex w-full max-w-[240px] items-center gap-1 border-r border-theme-border-moderate px-3 py-1">
				<div className="size-3" />
				{isFailed ? (
					<Minus className="h-4 w-4 shrink-0 fill-blue-500/50" />
				) : (
					<ExecutionStatusIcon
						status={isCompleted ? "completed" : isStopped ? "stopped" : "running"}
						className="h-4 w-4 fill-theme-text-warning"
					/>
				)}
				<div className="flex-1 truncate text-left font-semibold text-theme-text-primary/50">
					{stepName}
				</div>
			</div>
			<div className="min-w-0 flex-1 px-1"></div>
		</div>
	);
}
