import { VirtualizedItem } from "@/lib/timeline/types";

export function filterTimelineItems(timelineItems: VirtualizedItem[], search: string) {
	return timelineItems.filter((timelineItem) => {
		if (!search.trim()) return true;
		if (timelineItem.type === "separator") return false;
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
