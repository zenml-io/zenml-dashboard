import { TimelineItem } from "@/lib/timeline/types";
import {
	getTimelineStatusFilterLabel,
	type TimelineStatusFilterValue
} from "./timeline-status-filter";

export function getEmptyStateMessage(
	timelineItems: TimelineItem[],
	search: string,
	statusFilter: TimelineStatusFilterValue
) {
	if (timelineItems.length === 0) {
		return {
			title: "No steps available",
			description: "This pipeline run doesn't contain any steps to display."
		};
	}

	const statusLabel = getTimelineStatusFilterLabel(statusFilter);

	if (search.trim() && statusFilter !== "all") {
		return {
			title: "No steps found",
			description: `No ${statusLabel} steps found that match the search "${search}".`
		};
	}
	if (statusFilter !== "all") {
		return {
			title: "No steps found",
			description: `No steps found with the status "${statusLabel}".`
		};
	}

	return {
		title: "No steps found",
		description: `No steps found that match the search "${search}".`
	};
}
