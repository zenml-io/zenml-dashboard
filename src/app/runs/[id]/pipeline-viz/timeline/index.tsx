// import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { buildTimelineItems } from "@/lib/timeline/mapping";
import { TimelineItem } from "@/lib/timeline/types";
import { Dag } from "@/types/dag-visualizer";
import { useState } from "react";
import { TimelineNodeList } from "./node-list";
import { TimelineHeader } from "./timeline-header";
import { PiplineRunVisualizationView } from "../types";

/**
 * Helper function to calculate the maximum duration across all timeline items
 */
function calculateMaxDuration(timelineItems: TimelineItem[]): number {
	return Math.max(
		...timelineItems
			.map((item) => item.step.metadata.duration || 0)
			.filter((duration) => duration > 0),
		0 // fallback to 0 if no durations found
	);
}

/**
 * Helper function to calculate the earliest start time across all timeline items
 */
function calculateEarliestStartTime(timelineItems: TimelineItem[]): number {
	const startTimes = timelineItems
		.map((item) => item.step.metadata.startTime)
		.filter((startTime): startTime is number => startTime !== undefined);

	return startTimes.length > 0 ? Math.min(...startTimes) : 0;
}

type Props = {
	dagData: Dag;
	setActiveView: (view: PiplineRunVisualizationView) => void;
	refetchHandler: () => void;
};

export function TimelineView({ dagData, setActiveView, refetchHandler }: Props) {
	const [search, setSearch] = useState("");
	const nodes = dagData.nodes;
	const edges = dagData.edges;

	const steps = getRealSteps(nodes);
	const artifacts = getRealArtifacts(nodes);

	const timelineItems = buildTimelineItems({ steps, artifacts, edges });

	// Calculate max duration for relative scaling
	const maxDuration = calculateMaxDuration(timelineItems);

	// Calculate earliest start time for timeline offset
	const earliestStartTime = calculateEarliestStartTime(timelineItems);

	const filteredTimelineItems = timelineItems.filter((i) => {
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

	return (
		<div className="flex h-full flex-col">
			<TimelineHeader
				onSearch={setSearch}
				search={search}
				refetchHandler={refetchHandler}
				setActiveView={setActiveView}
			/>
			<TimelineNodeList
				timelineItems={filteredTimelineItems}
				maxDuration={maxDuration}
				earliestStartTime={earliestStartTime}
			/>
		</div>
	);
}
