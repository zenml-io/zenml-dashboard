import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { EXECUTION_STATUS_FILTER_OPTIONS } from "@/lib/runs/execution-status-filter-options";
import type { ExecutionStatusFilterValue } from "@/types/pipeline-runs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { cn } from "@zenml-io/react-component-library/utilities";
import { ElementRef, forwardRef } from "react";

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
					{EXECUTION_STATUS_FILTER_OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							<div className="flex items-center gap-2">
								{option.value !== "all" && (
									<ExecutionStatusIcon
										className="size-4 shrink-0 !animate-none"
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

ExecutionStatusFilter.displayName = "ExecutionStatusFilter";
