import { EXECUTION_STATUS_FILTER_OPTIONS } from "@/lib/runs/execution-status-filter-options";
import type { ExecutionStatusFilterValue } from "@/types/pipeline-runs";

export type TimelineStatusFilterValue = ExecutionStatusFilterValue | "not_started";

export type TimelineStatusFilterOption = {
	value: TimelineStatusFilterValue;
	label: string;
};

export const TIMELINE_STATUS_FILTER_OPTIONS = [
	{ value: "all", label: "All" },
	{ value: "not_started", label: "Not started" },
	...EXECUTION_STATUS_FILTER_OPTIONS.filter((option) => option.value !== "all")
] as const satisfies readonly TimelineStatusFilterOption[];

export function getTimelineStatusFilterLabel(statusFilter: TimelineStatusFilterValue) {
	return (
		TIMELINE_STATUS_FILTER_OPTIONS.find((option) => option.value === statusFilter)?.label ??
		statusFilter
	);
}
