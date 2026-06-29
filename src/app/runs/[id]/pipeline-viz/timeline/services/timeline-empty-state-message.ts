import { TimelineItem } from "@/lib/timeline/types";
import type { ExecutionStatusFilterValue } from "@/components/runs/execution-status-filter";

export function getEmptyStateMessage(
	timelineItems: TimelineItem[],
	search: string,
	statusFilter: ExecutionStatusFilterValue
) {
	if (timelineItems.length === 0) {
		return {
			title: "No steps available",
			description: "This pipeline run doesn't contain any steps to display."
		};
	}
	if (search.trim() && statusFilter !== "all") {
		return {
			title: "No steps found",
			description: `No ${statusFilter} steps found that match the search "${search}".`
		};
	}
	if (statusFilter !== "all") {
		return {
			title: "No steps found",
			description: `No steps found with the status "${statusFilter}".`
		};
	}

	return {
		title: "No steps found",
		description: `No steps found that match the search "${search}".`
	};
}
