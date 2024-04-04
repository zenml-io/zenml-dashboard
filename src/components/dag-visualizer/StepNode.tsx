import { StepNodeDetails } from "@/types/pipeline-runs";
import { NodeProps } from "reactflow";
import { ExecutionStatusIcon, getExecutionStatusBackgroundColor } from "../ExecutionStatus";
import { BaseNode } from "./BaseNode";

export function StepNode({ data, selected }: NodeProps<StepNodeDetails>) {
	return (
		<BaseNode>
			{/* <StepSheet onOpenChange={openChangeHandler} stepId={data.execution_id}> */}
			{/* TODO check shadow in design system */}
			<button
				data-selected={!!selected}
				className="h-[70px] max-w-[300px] overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary transition-all duration-200 hover:border-neutral-400 hover:shadow-md data-[selected=true]:border-theme-border-bold data-[selected=true]:shadow-md"
			>
				<div className="flex items-center gap-1 py-1 pl-1 pr-2">
					<div className={`rounded-sm p-0.5 ${getExecutionStatusBackgroundColor(data.status)}`}>
						<ExecutionStatusIcon status={data.status} className="h-4 w-4" />
					</div>
					<p className="truncate font-semibold">{data.name}</p>
				</div>
			</button>
			{/* </StepSheet> */}
		</BaseNode>
	);
}
