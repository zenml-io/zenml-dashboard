import { TimelineItem } from "@/lib/timeline/types";

export function filterTimelineItems(timelineItems: TimelineItem[], search: string) {
	return timelineItems.filter((i) => {
		if (!search.trim()) return true;
		const searchLower = search.toLowerCase();
		if (i.step.name.toLowerCase().includes(searchLower)) {
			return true;
		}
		if (i.inputs.some((input) => input.name.toLowerCase().includes(searchLower))) {
			return true;
		}
		if (i.outputs.some((output) => output.name.toLowerCase().includes(searchLower))) {
			return true;
		}
		return false;
	});
}
