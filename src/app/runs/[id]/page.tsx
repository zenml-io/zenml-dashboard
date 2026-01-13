import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RunsDetailTabs, TabsHeader } from "./detail-tabs";
import { ExpandPanelButton, GlobalDagControls } from "./expand-panel-button";
import { PipelineVisualization } from "./pipeline-viz";

import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle
} from "react-resizable-panels";

export default function RunDetailPage() {
	const { runId } = useParams() as { runId: string };

	const ref = useRef<ImperativePanelHandle>(null);
	const [isCollapsed, setIsCollapsed] = useState(false);

	function collapsePanel() {
		ref.current?.collapse();
	}

	function expandPanel() {
		const panel = ref.current;
		if (panel) {
			panel.expand();
		}
	}

	return (
		<PanelGroup direction="horizontal" className="relative">
			<Panel minSize={25} defaultSize={50}>
				<PipelineVisualization runId={runId} />
				<GlobalDagControls>
					<ExpandPanelButton isCollapsed={isCollapsed} handlePanelToggle={expandPanel} />
				</GlobalDagControls>
			</Panel>
			<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />
			<Panel
				collapsible
				ref={ref}
				className="flex flex-col !overflow-y-auto"
				minSize={25}
				defaultSize={50}
				onCollapse={() => setIsCollapsed(true)}
				onExpand={() => setIsCollapsed(false)}
			>
				<TabsHeader handlePanelToggle={collapsePanel} />
				<RunsDetailTabs />
			</Panel>
		</PanelGroup>
	);
}
