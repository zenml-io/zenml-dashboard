import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import { useEffect, useMemo, useState } from "react";
import { DAG } from "./Dag";
import { PipelineTimeline } from "./PipelineTimeline";
import { useDag } from "./useDag";
import { ViewToggle } from "./ViewToggle";

export type ViewType = "dag" | "timeline";

interface PipelineVisualizationContainerProps {
	isPanelOpen?: boolean;
}

export function PipelineVisualizationContainer({
-interface PipelineVisualizationContainerProps {
-  isPanelOpen?: boolean;
-}
-
-export function PipelineVisualizationContainer({
-  isPanelOpen = true
export function PipelineVisualizationContainer() {
   // …rest of component logic…
 }
	const { nodes, dagQuery } = useDag();

	const [view, setView] = useState<ViewType>("dag");

	// Set view based on step count when DAG data is loaded
	useEffect(() => {
		// Only proceed when DAG query is successful and raw data is available
		if (dagQuery.isSuccess && dagQuery.data && dagQuery.data.nodes) {
			// Count steps from raw DAG data (before ReactFlow processing)
			const rawStepNodes = dagQuery.data.nodes.filter(
				(node: { type: string }) => node.type === "step"
			);
			const stepCount = rawStepNodes.length;

			// Only auto-switch to timeline if we're still on the default "dag" view
			// This prevents overriding user's manual choice
			setView((prevView) => {
				if (prevView === "dag" && stepCount > 50) {
					return "timeline";
				}
				return prevView;
			});
		}
	}, [dagQuery.isSuccess, dagQuery.data]);

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
