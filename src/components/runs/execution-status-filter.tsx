import Minus from "@/assets/icons/minus.svg?react";
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
import { ElementRef, ForwardedRef, forwardRef, ReactElement, RefAttributes } from "react";

export type StatusFilterValue = ExecutionStatusFilterValue | "not_started";

export type StatusFilterOption<T extends StatusFilterValue = StatusFilterValue> = {
	value: T;
	label: string;
};

type Props<T extends StatusFilterValue = ExecutionStatusFilterValue> = {
	value: T;
	onValueChange: (value: T) => void;
	options?: readonly StatusFilterOption<T>[];
	className?: string;
};

function ExecutionStatusFilterInner<T extends StatusFilterValue = ExecutionStatusFilterValue>(
	{ value, onValueChange, options, className }: Props<T>,
	ref: ForwardedRef<ElementRef<typeof SelectTrigger>>
) {
	const filterOptions: readonly StatusFilterOption[] = options ?? EXECUTION_STATUS_FILTER_OPTIONS;

	return (
		<Select value={value} onValueChange={(newValue) => onValueChange(newValue as T)}>
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
				{filterOptions.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						<div className="flex items-center gap-2">
							<StatusFilterOptionIcon value={option.value} />
							<span className="truncate">{option.label}</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export const ExecutionStatusFilter = forwardRef(ExecutionStatusFilterInner) as (<
	T extends StatusFilterValue = ExecutionStatusFilterValue
>(
	props: Props<T> & RefAttributes<ElementRef<typeof SelectTrigger>>
) => ReactElement | null) & { displayName?: string };

ExecutionStatusFilter.displayName = "ExecutionStatusFilter";

function StatusFilterOptionIcon({ value }: { value: StatusFilterValue }) {
	if (value === "all") return null;
	if (value === "not_started") {
		return <Minus className="size-4 shrink-0 fill-blue-500/50" />;
	}
	return <ExecutionStatusIcon className="size-4 shrink-0 !animate-none" status={value} />;
}
