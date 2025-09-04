import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import { buildTimelineItems } from "@/lib/timeline/mapping";
import { TimelineItem } from "@/lib/timeline/types";
import { Dag } from "@/types/dag-visualizer";
import { useState } from "react";
import { PiplineRunVisualizationView } from "../types";
import { TimelineNodeList } from "./node-list";
import { TimelineHeader } from "./timeline-header";
import { TimelineEmptyState } from "./timeline-empty-state";

function calculateMaxDuration(timelineItems: TimelineItem[]): number {
	return Math.max(
		...timelineItems
			.map((item) => item.step.metadata.duration || 0)
			.filter((duration) => duration > 0),
		0
	);
}

function calculateEarliestStartTime(timelineItems: TimelineItem[]): number {
	const startTimes = timelineItems
		.map((item) => item.startTimeMs)
		.filter((startTimeMs): startTimeMs is number => startTimeMs !== undefined);

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
		<SheetProvider>
			<div className="flex h-full flex-col">
				<TimelineHeader
					onSearch={setSearch}
					search={search}
					refetchHandler={refetchHandler}
					setActiveView={setActiveView}
				/>
				{filteredTimelineItems.length > 0 ? (
					<TimelineNodeList
						runStatus={dagData.status}
						timelineItems={filteredTimelineItems}
						maxDuration={maxDuration}
						earliestStartTime={earliestStartTime}
					/>
				) : timelineItems.length === 0 ? (
					<TimelineEmptyState
						title="No steps available"
						description="This pipeline run doesn't contain any steps to display."
					/>
				) : (
					<TimelineEmptyState
						title="No steps found"
						description={`No steps found that match the search "${search}".`}
					/>
				)}
			</div>
			<GlobalSheets />
		</SheetProvider>
	);
}
