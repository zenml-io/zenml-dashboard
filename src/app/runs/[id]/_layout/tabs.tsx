"use client";

import DagIcon from "@/assets/icons/dataflow.svg?react";
import LogIcon from "@/assets/icons/logs.svg?react";
import { TabIcon } from "@/components/tab-icon";
import { routes } from "@/router/routes";
import {
	ScrollArea,
	ScrollBar,
	Tabs,
	TabsList,
	TabsTrigger
} from "@zenml-io/react-component-library/components/client";
import { Link, useParams } from "react-router-dom";
import { useActivePipelineRunTab } from "./use-active-pipeline-run-tab";

export function PipelineRunDetailTabs() {
	const { runId } = useParams() as { runId: string };
	const activeTab = useActivePipelineRunTab();

	console.log(activeTab);

	return (
		<Tabs value={activeTab}>
			<ScrollArea>
				<div className="flex items-end justify-between gap-3">
					<TabsList className="flex-nowrap border-none [&_*]:flex [&_*]:items-center [&_*]:gap-1">
						<TabsTrigger asChild value="visualization">
							<Link to={routes.projects.runs.detail(runId)}>
								<TabIcon icon={DagIcon} />
								<span>Visualization</span>
							</Link>
						</TabsTrigger>
						<TabsTrigger asChild value="logs">
							<Link to={routes.projects.runs.detailLogs(runId)}>
								<TabIcon icon={LogIcon} />
								<span>Logs</span>
							</Link>
						</TabsTrigger>
					</TabsList>
				</div>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
