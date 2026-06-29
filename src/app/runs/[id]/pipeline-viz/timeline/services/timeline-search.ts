import { VirtualizedItem } from "@/lib/timeline/types";
import type { ExecutionStatusFilterValue } from "@/components/runs/execution-status-filter";

export function filterTimelineItems(
	timelineItems: VirtualizedItem[],
	search: string,
	statusFilter: ExecutionStatusFilterValue
) {
	return timelineItems.filter((timelineItem) => {
		if (timelineItem.type === "separator") {
			return statusFilter === "all" && !search.trim();
		}

		if (statusFilter !== "all") {
			if (timelineItem.type !== "timeline") return false;
			if (timelineItem.item.step.metadata.status !== statusFilter) return false;
		}

		if (!search.trim()) return true;
		const searchLower = search.toLowerCase();
		if (timelineItem.type === "timeline") {
			const item = timelineItem.item;
			if (item.step.name.toLowerCase().includes(searchLower)) {
				return true;
			}
			if (item.inputs.some((input) => input.name.toLowerCase().includes(searchLower))) {
				return true;
			}
			if (item.outputs.some((output) => output.name.toLowerCase().includes(searchLower))) {
				return true;
			}
			return false;
		}
		if (timelineItem.type === "placeholder") {
			const item = timelineItem.item;
			if (item.name.toLowerCase().includes(searchLower)) {
				return true;
			}
			return false;
		}
		return false;
	});
}
