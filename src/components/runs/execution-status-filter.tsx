import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import type { ExecutionStatus } from "@/types/pipeline-runs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { cn } from "@zenml-io/react-component-library/utilities";
import { ElementRef, forwardRef } from "react";

export type ExecutionStatusFilterValue = ExecutionStatus | "all";

const STATUS_OPTIONS: Array<{ value: ExecutionStatusFilterValue; label: string }> = [
	{ value: "all", label: "All" },
	{ value: "completed", label: "Completed" },
	{ value: "failed", label: "Failed" },
	{ value: "running", label: "Running" },
	{ value: "cached", label: "Cached" },
	{ value: "stopped", label: "Stopped" },
	{ value: "retried", label: "Retried" },
	{ value: "initializing", label: "Initializing" }
];

type Props = {
	value: ExecutionStatusFilterValue;
	onValueChange: (value: ExecutionStatusFilterValue) => void;
	className?: string;
};

export const ExecutionStatusFilter = forwardRef<ElementRef<typeof SelectTrigger>, Props>(
	function ExecutionStatusFilter({ value, onValueChange, className }, ref) {
		return (
			<Select
				value={value}
				onValueChange={(newValue) => onValueChange(newValue as ExecutionStatusFilterValue)}
			>
				<SelectTrigger
					ref={ref}
					className={cn(className, "bg-theme-surface-primary")}
					aria-label="Filter by execution status"
				>
					<span className="truncate">
						<SelectValue placeholder="All statuses" />
					</span>
				</SelectTrigger>
				<SelectContent>
					{STATUS_OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							<div className="flex items-center gap-2">
								{option.value !== "all" && (
									<ExecutionStatusIcon
										className="size-4 shrink-0 animate-none"
										status={option.value}
									/>
								)}
								<span className="truncate">{option.label}</span>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		);
	}
);
