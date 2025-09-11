import { TimelineItem } from "@/lib/timeline/types";

export function getEmptyStateMessage(timelineItems: TimelineItem[], search: string) {
	if (timelineItems.length === 0) {
		return {
			title: "No steps available",
			description: "This pipeline run doesn't contain any steps to display."
		};
	}

	return {
		title: "No steps found",
		description: `No steps found that match the search "${search}".`
	};
}
