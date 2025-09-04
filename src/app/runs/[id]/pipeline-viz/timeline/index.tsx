// import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { getRealArtifacts, getRealSteps } from "@/components/dag-visualizer/node-types";
import { buildTimelineItems } from "@/lib/timeline/mapping";
import { Dag } from "@/types/dag-visualizer";
import { useState } from "react";
import { TimelineNodeList } from "./node-list";
import { TimelineHeader } from "./timeline-header";
import { PiplineRunVisualizationView } from "../types";

type Props = {
	dagData: Dag;
	setActiveView: (view: PiplineRunVisualizationView) => void;
};

export function TimelineView({ dagData, setActiveView }: Props) {
	const [search, setSearch] = useState("");
	const nodes = dagData.nodes;
	const edges = dagData.edges;

	const steps = getRealSteps(nodes);
	const artifacts = getRealArtifacts(nodes);

	const timelineItems = buildTimelineItems({ steps, artifacts, edges });

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
			<TimelineHeader onSearch={setSearch} search={search} setActiveView={setActiveView} />
			<TimelineNodeList timelineItems={filteredTimelineItems} />
		</div>
	);
}
