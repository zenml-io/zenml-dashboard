import Search from "@/assets/icons/search.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { ExecutionStatusFilter } from "@/components/runs/execution-status-filter";
import { StatusFilter } from "./common-types";

type Props = {
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	statusFilter: StatusFilter;
	setStatusFilter: (value: StatusFilter) => void;
};

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
			<ExecutionStatusFilter
				value={statusFilter}
				onValueChange={setStatusFilter}
				className="h-6 flex-1 truncate border border-theme-border-moderate text-text-sm"
			/>
		</section>
	);
}
