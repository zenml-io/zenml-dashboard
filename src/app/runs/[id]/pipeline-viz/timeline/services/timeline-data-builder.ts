import {
	getPreviewSteps,
	getRealArtifacts,
	getRealSteps,
	getRealTriggeredRuns
} from "@/components/dag-visualizer/node-types";
import { calculateEarliestStartTime, calculateTotalTimelineSpan } from "@/lib/timeline/calculate";
import { buildTimelineItems } from "@/lib/timeline/mapping";
import { Dag } from "@/types/dag-visualizer";

export function buildTimeline(dagData: Dag, isRunning: boolean, currentTime: number) {
	const nodes = dagData.nodes;
	const edges = dagData.edges;

	const steps = getRealSteps(nodes);
	const artifacts = getRealArtifacts(nodes);
	const triggeredRuns = getRealTriggeredRuns(nodes);

	const placeholderSteps = getPreviewSteps(nodes);

	const timelineItems = buildTimelineItems({
		steps,
		artifacts,
		edges,
		rawTriggeredRuns: triggeredRuns
	});

	const earliestStartTime = calculateEarliestStartTime(timelineItems);

	const totalTimelineSpanMs = calculateTotalTimelineSpan(
		timelineItems,
		isRunning ? currentTime : undefined
	);

	return {
		totalTimelineSpanMs,
		timelineItems,
		earliestStartTime,
		placeholderSteps
	};
}
