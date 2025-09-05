import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import { Dag } from "@/types/dag-visualizer";
import { useState } from "react";
import { PiplineRunVisualizationView } from "../types";
import { TimelineEmptyState } from "./components/timeline-empty-state";
import { TimelineHeader } from "./components/timeline-header";
import { TimelineList } from "./components/timeline-list";
import { useRealtimeTimeline } from "./hooks/use-timeline-realtime";
import { buildTimeline } from "./services/timeline-data-builder";
import { getEmptyStateMessage } from "./services/timeline-empty-state-message";
import { filterTimelineItems } from "./services/timeline-search";

type Props = {
	dagData: Dag;
	setActiveView: (view: PiplineRunVisualizationView) => void;
	refetchHandler: () => void;
};

export function TimelineView({ dagData, setActiveView, refetchHandler }: Props) {
	const [search, setSearch] = useState("");
	const isRunning = dagData.status === "running";

	const { currentTime } = useRealtimeTimeline(isRunning);
	const { timelineItems, earliestStartTime, totalTimelineSpanMs } = buildTimeline(
		dagData,
		isRunning,
		currentTime
	);

	const filteredTimelineItems = filterTimelineItems(timelineItems, search);

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
					<TimelineList
						runStatus={dagData.status}
						timelineItems={filteredTimelineItems}
						earliestStartTime={earliestStartTime}
						totalTimelineSpanMs={totalTimelineSpanMs}
					/>
				) : (
					<TimelineEmptyState {...getEmptyStateMessage(timelineItems, search)} />
				)}
			</div>
			<GlobalSheets />
		</SheetProvider>
	);
}
