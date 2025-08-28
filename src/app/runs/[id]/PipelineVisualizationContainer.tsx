import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import { useState } from "react";
import { DAG } from "./Dag";
import { PipelineTimeline } from "./PipelineTimeline";
import { ViewToggle } from "./ViewToggle";

export type ViewType = "dag" | "timeline";

export function PipelineVisualizationContainer() {
	const [view, setView] = useState<ViewType>("dag");

	return (
		<SheetProvider>
			<div className="relative h-full w-full">
				<ViewToggle currentView={view} onViewChange={setView} />
				{view === "dag" ? <DAG /> : <PipelineTimeline />}
			</div>
			<GlobalSheets />
		</SheetProvider>
	);
}
