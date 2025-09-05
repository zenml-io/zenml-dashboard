import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { calculateEarliestStartTime, calculateTotalTimelineSpan } from "@/lib/timeline/calculate";
import { buildTimelineItems } from "@/lib/timeline/mapping";
import { Dag } from "@/types/dag-visualizer";

export function buildTimeline(dagData: Dag, isRunning: boolean, currentTime: number) {
	const nodes = dagData.nodes;
	const edges = dagData.edges;

	const steps = getRealSteps(nodes);
	const artifacts = getRealArtifacts(nodes);

	const timelineItems = buildTimelineItems({ steps, artifacts, edges });

	const earliestStartTime = calculateEarliestStartTime(timelineItems);

	const totalTimelineSpanMs = calculateTotalTimelineSpan(
		timelineItems,
		isRunning ? currentTime : undefined
	);

	return {
		totalTimelineSpanMs,
		timelineItems,
		earliestStartTime
	};
}
