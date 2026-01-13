import {
	ImperativePanelHandle,
	Panel,
	PanelGroup,
	PanelResizeHandle
} from "react-resizable-panels";
import { PipelineRunLogsList } from "./components/log-viewer";
import { useRef } from "react";
import { PipelineRunLogsSidebar } from "./components/sidebar";

export default function PipelineRunLogsPage() {
	const leftPanelRef = useRef<ImperativePanelHandle>(null);

	function toggleSidebar() {
		const panel = leftPanelRef.current;
		if (panel) {
			if (panel.isCollapsed()) {
				panel.expand();
			} else {
				panel.collapse();
			}
		}
	}

	return (
		<>
			<PanelGroup direction="horizontal" className="relative flex w-full">
				<Panel
					collapsible
					ref={leftPanelRef}
					className="bg-theme-surface-primary"
					minSize={10}
					maxSize={40}
					defaultSize={20}
				>
					<PipelineRunLogsSidebar />
				</Panel>
				<PanelResizeHandle className="w-[1px] bg-theme-border-moderate transition-colors duration-200 data-[resize-handle-state=drag]:bg-theme-border-bold data-[resize-handle-state=hover]:bg-theme-border-bold" />

				<Panel collapsible className="flex flex-col !overflow-y-auto" minSize={25} defaultSize={80}>
					<PipelineRunLogsList toggleSidebar={toggleSidebar} />
				</Panel>
			</PanelGroup>
		</>
	);
}
