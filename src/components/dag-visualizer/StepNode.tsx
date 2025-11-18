import Copy from "@/assets/icons/copy.svg?react";
import { getStepSnippet } from "@/lib/code-snippets";
import { secondsToTimeString } from "@/lib/dates";
import { StepNodePayload } from "@/types/dag-visualizer";
import { clsx } from "clsx";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { ExecutionStatusIcon, getExecutionStatusBackgroundColor } from "../ExecutionStatus";
import { BaseNode } from "./BaseNode";
import { CopyNodeButton } from "./NodeCopyButton";
import { getIsStatusUnknown } from "./layout/status";
import { useSheetContext } from "./sheet-context";

export function StepNodeComponent({ data, selected }: NodeProps<StepNodePayload>) {
	const { openStepSheet } = useSheetContext();

	const isFailed = data.status === "failed";
	function handleClick() {
		openStepSheet(data.node_id);
	}

	const isStatusUnknown = getIsStatusUnknown(data.status, data.runStatus);

	return (
		<BaseNode>
			<button
				onClick={handleClick}
				data-failed={isFailed}
				data-selected={!!selected}
				className={clsx(
					"group max-h-[80px] max-w-[300px] overflow-hidden rounded-md border bg-theme-surface-primary transition-all duration-200 hover:shadow-md data-[selected=true]:shadow-md",
					{
						"border-theme-border-moderate hover:border-neutral-400 data-[selected=true]:border-theme-border-bold":
							!isFailed,
						"border-error-200": isFailed
					}
				)}
			>
				<div className="flex flex-1 items-center gap-1 py-1 pl-1 pr-2">
					<div
						className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(
							isStatusUnknown ? "unknown" : data.status
						)}`}
					>
						<ExecutionStatusIcon
							status={isStatusUnknown ? "unknown" : data.status}
							className="h-4 w-4 shrink-0"
						/>
					</div>
					<p className="truncate font-semibold">{data.node_name}</p>
					<CopyNodeButton
						className="h-4 w-4 shrink-0 rounded-sm hover:bg-theme-surface-secondary active:bg-neutral-300"
						code={getStepSnippet(data.node_id)}
						type="step"
					>
						<Copy className="h-3 w-3 fill-theme-text-tertiary" />
						<div className="sr-only">Copy code to load step</div>
					</CopyNodeButton>
				</div>

				<div
					data-failed={isFailed}
					className="flex flex-1 justify-end border-t border-theme-border-moderate bg-theme-surface-tertiary px-2 py-0.5 text-text-xs text-theme-text-secondary data-[failed=true]:border-error-200 data-[failed=true]:bg-error-50 data-[failed=true]:text-theme-text-error"
				>
					{(() => {
						if (isFailed) {
							return "Execution failed";
						}
						if (data.duration === undefined || data.duration === null) {
							return "N/A";
						}
						return secondsToTimeString(data.duration);
					})()}
				</div>
			</button>
		</BaseNode>
	);
}

export const StepNode = memo(StepNodeComponent);
