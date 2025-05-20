import Copy from "@/assets/icons/copy.svg?react";
import { getStepSnippet } from "@/lib/code-snippets";
import { calculateTimeDifference } from "@/lib/dates";
import { Step } from "@/types/steps";
import { clsx } from "clsx";
import { NodeProps, ReactFlowState, useStore } from "reactflow";
import { ExecutionStatusIcon, getExecutionStatusBackgroundColor } from "../ExecutionStatus";
import { StepSheet } from "../steps/step-sheet";
import { BaseNode } from "./BaseNode";
import { CopyNodeButton } from "./NodeCopyButton";
import { getIsStatusUnknown } from "./layout/status";
import { ExecutionStatus } from "@/types/pipeline-runs";

const selector = (state: ReactFlowState) => ({
	unselectAll: state.unselectNodesAndEdges
});

export function StepNode({ data, selected }: NodeProps<Step & { runStatus: ExecutionStatus }>) {
	const { unselectAll } = useStore(selector);

	const isFailed = data.body?.status === "failed";
	function openChangeHandler(isOpen: boolean) {
		if (!isOpen) {
			// this is a hack to make sure the unselectNodesAndEdges is called after the step sheet is closed
			setTimeout(() => {
				unselectAll();
			}, 100);
		}
	}

	const isStatusUnknown = getIsStatusUnknown(data.body?.status ?? "running", data.runStatus);

	return (
		<BaseNode>
			<StepSheet onOpenChange={openChangeHandler} stepId={data.id}>
				<button
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
								isStatusUnknown ? "unknown" : data.body?.status
							)}`}
						>
							<ExecutionStatusIcon
								status={isStatusUnknown ? "unknown" : data.body?.status}
								className="h-4 w-4 shrink-0"
							/>
						</div>
						<p className="truncate font-semibold">{data.name}</p>
						<CopyNodeButton
							className="h-4 w-4 shrink-0 rounded-sm hover:bg-theme-surface-secondary active:bg-neutral-300"
							code={getStepSnippet(data.id)}
							type="step"
						>
							<Copy className="h-3 w-3 fill-theme-text-tertiary" />
							<div className="sr-only">Copy code to load step</div>
						</CopyNodeButton>
					</div>
					<div
						data-failed={isFailed}
						className="flex flex-1 justify-end border-t border-theme-border-moderate bg-theme-surface-tertiary px-2 py-0.5 text-text-xs data-[failed=true]:border-error-200 data-[failed=true]:bg-error-50 data-[failed=true]:text-theme-text-error"
					>
						{(() => {
							if (isFailed) {
								return "Execution failed";
							}
							if (!data.body?.start_time || !data.body.end_time) {
								return "N/A";
							}
							return calculateTimeDifference(data.body.start_time, data.body.end_time);
						})()}
					</div>
				</button>
			</StepSheet>
		</BaseNode>
	);
}
