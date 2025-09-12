import { TimelineItem, VirtualizedItem } from "@/lib/timeline/types";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Node } from "@/types/dag-visualizer";

type Args = {
	timelineItems: TimelineItem[];
	runStatus: ExecutionStatus;
	placeholderSteps: Node[];
};

export function virtualizeTimelineItems({ timelineItems, runStatus, placeholderSteps }: Args) {
	const virtualizedItems: VirtualizedItem[] = [];

	timelineItems.forEach((item) => {
		virtualizedItems.push({
			type: "timeline",
			item: item
		});
	});

	if (runStatus === "failed") {
		if (placeholderSteps.length > 0) {
			virtualizedItems.push({
				type: "separator"
			});
		}

		placeholderSteps.forEach((item) => {
			virtualizedItems.push({
				type: "placeholder",
				item: item
			});
		});
	}

	return virtualizedItems;
}
