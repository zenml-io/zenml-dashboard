import { useServerInfo } from "@/data/server/info-query";
import { checkIsLocalServer } from "@/lib/server";
import { ScrollArea } from "@zenml-io/react-component-library";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RunsDetailHeader } from "./Header";
import { RunsDetailTabs, TabsHeader } from "./detail-tabs";
import { ExpandPanelButton, GlobalDagControls } from "./expand-panel-button";
import { PipelineVisualization } from "./pipeline-viz";

export default function RunDetailPage() {
	const { runId } = useParams() as { runId: string };
	const serverInfo = useServerInfo();
	const isLocal = checkIsLocalServer(serverInfo.data?.deployment_type || "other");
	const [isPanelOpen, setIsPanelOpen] = useState(true);
	return (
		<div>
			<RunsDetailHeader />
			<div
				className={`flex ${isLocal ? "h-[calc(100vh_-_4rem_-_4rem_-_4rem_-_2px)]" : "h-[calc(100vh_-_4rem_-_4rem_-_2px)]"} w-full`}
			>
				<div
					className={`relative bg-white/40 transition-all duration-500 ${
						isPanelOpen ? "w-1/2" : "w-full"
					}`}
				>
					<PipelineVisualization runId={runId} />
					<GlobalDagControls>
						<ExpandPanelButton isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} />
					</GlobalDagControls>
				</div>
				<div
					aria-hidden={!isPanelOpen}
					className={`h-full min-w-0 overflow-x-hidden text-ellipsis whitespace-nowrap bg-theme-surface-secondary transition-all duration-500 ${
						isPanelOpen ? "w-1/2 border-l border-theme-border-moderate" : "w-0 border-transparent"
					}`}
				>
					<ScrollArea viewportClassName="[&>*]:!block">
						<TabsHeader setIsPanelOpen={setIsPanelOpen} />
						<RunsDetailTabs />
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
