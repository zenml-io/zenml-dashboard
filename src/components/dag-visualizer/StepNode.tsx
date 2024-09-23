import { Step } from "@/types/steps";
import { clsx } from "clsx";
import { NodeProps, ReactFlowState, useStore } from "reactflow";
import { BaseNode } from "./BaseNode";
import { StepSheet } from "../steps/step-sheet";
import { ExecutionStatusIcon, getExecutionStatusBackgroundColor } from "../ExecutionStatus";

const selector = (state: ReactFlowState) => ({
	unselectAll: state.unselectNodesAndEdges
});

export function StepNode({ data, selected }: NodeProps<Step>) {
	const { unselectAll } = useStore(selector);

	function openChangeHandler(isOpen: boolean) {
		if (!isOpen) {
			// this is a hack to make sure the unselectNodesAndEdges is called after the step sheet is closed
			setTimeout(() => {
				unselectAll();
			}, 100);
		}
	}

	return (
		<BaseNode>
			<StepSheet onOpenChange={openChangeHandler} stepId={data.id}>
				{/* TODO check shadow in design system */}
				<button
					data-selected={!!selected}
					className={clsx(
						"h-[50px] max-w-[300px] rounded-md border  bg-theme-surface-primary transition-all duration-200  hover:shadow-md  data-[selected=true]:shadow-md",
						{
							"border-theme-border-moderate hover:border-neutral-400 data-[selected=true]:border-theme-border-bold":
								data.body?.status !== "failed",
							"border-error-200": data.body?.status === "failed"
						}
					)}
				>
					<div className="flex items-center gap-1 py-1 pl-1 pr-2">
						<div
							className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(data.body?.status)}`}
						>
							<ExecutionStatusIcon status={data.body?.status} className="h-4 w-4" />
						</div>
						<p className="truncate font-semibold">{data.name}</p>
					</div>
				</button>
			</StepSheet>
		</BaseNode>
	);
}
