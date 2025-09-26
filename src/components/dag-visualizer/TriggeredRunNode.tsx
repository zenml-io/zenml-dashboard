import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { secondsToTimeString } from "@/lib/dates";
import { StepNodePayload } from "@/types/dag-visualizer";
import { clsx } from "clsx";
import { memo } from "react";
import { NodeProps } from "reactflow";
import { ExecutionStatusIcon, getExecutionStatusColor } from "../ExecutionStatus";
import { BaseNode } from "./BaseNode";
import { getIsStatusUnknown } from "./layout/status";
import { useSheetContext } from "./sheet-context";

export function TriggeredRunNodeComponent({ data, selected }: NodeProps<StepNodePayload>) {
	const { openTriggeredRunSheet } = useSheetContext();

	const isFailed = data.status === "failed";
	function handleClick() {
		openTriggeredRunSheet(data.node_id);
	}

	const isStatusUnknown = getIsStatusUnknown(data.status, data.runStatus);

	return (
		<BaseNode>
			<button
				onClick={handleClick}
				data-failed={isFailed}
				data-selected={!!selected}
				className={clsx(
					"group h-[60px] max-w-[300px] overflow-hidden rounded-md border bg-theme-surface-primary transition-all duration-200 hover:shadow-md data-[selected=true]:shadow-md",
					{
						"border-theme-border-moderate hover:border-neutral-400 data-[selected=true]:border-theme-border-bold":
							!isFailed,
						"border-error-200": isFailed
					}
				)}
			>
				<div className="flex h-full items-center gap-1 py-1 pl-1 pr-2 text-text-sm">
					<RunIcon className={`h-4 w-4 shrink-0 ${getExecutionStatusColor(data.status)}`} />
					<div className="truncate">
						<p className="truncate font-semibold">{data.node_name}</p>
						<p className="text-left text-theme-text-secondary">
							{(() => {
								if (isFailed) {
									return "Execution failed";
								}
								if (data.duration === undefined || data.duration === null) {
									return "N/A";
								}
								return secondsToTimeString(data.duration);
							})()}
						</p>
					</div>
					<ExecutionStatusIcon
						status={isStatusUnknown ? "unknown" : data.status}
						className="h-4 w-4 shrink-0"
					/>
				</div>
			</button>
		</BaseNode>
	);
}

export const TriggeredRunNode = memo(TriggeredRunNodeComponent);
