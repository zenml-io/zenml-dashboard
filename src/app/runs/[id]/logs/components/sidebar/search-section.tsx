import Search from "@/assets/icons/search.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { StatusFilter } from "./common-types";

type Props = {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	statusFilter: StatusFilter;
	setStatusFilter: (value: StatusFilter) => void;
};

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
	{ value: "all", label: "All" },
	{ value: "completed", label: "Completed" },
	{ value: "failed", label: "Failed" },
	{ value: "running", label: "Running" },
	{ value: "cached", label: "Cached" },
	{ value: "stopped", label: "Stopped" },
	{ value: "retried", label: "Retried" },
	{ value: "initializing", label: "Initializing" }
];

export function PipelineRunLogsSidebarSearchSection({
	searchTerm,
	setSearchTerm,
	statusFilter,
	setStatusFilter
}: Props) {
	return (
		<section className="flex items-center gap-1">
			<div className="relative w-3/5">
				<DebouncedInput
					inputSize="sm"
					value={searchTerm}
					onChange={setSearchTerm}
					placeholder="Find step"
					className="w-full pl-[36px]"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-1">
					<Search className="size-4 fill-neutral-400" />
				</div>
			</div>
			<Select
				value={statusFilter}
				onValueChange={(value) => setStatusFilter(value as StatusFilter)}
			>
				<SelectTrigger className="h-6 flex-1 truncate border border-theme-border-moderate text-text-sm">
					<span className="truncate">
						<SelectValue placeholder="All" />
					</span>
				</SelectTrigger>
				<SelectContent>
					{statusOptions.map((option) => (
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
		</section>
	);
}
