import SnapshotIcon from "@/assets/icons/pipeline-template.svg?react";
import DeploymentIcon from "@/assets/icons/rocket.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
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
import { useActiveTab } from "./use-active-tab";

export function PipelineDetailTabs() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const activeTab = useActiveTab();
	return (
		<Tabs value={activeTab}>
			<ScrollArea>
				<TabsList className="flex-nowrap border-none [&_*]:flex [&_*]:items-center [&_*]:gap-1">
					<TabsTrigger asChild value="runs">
						<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
							<TabIcon icon={RunIcon} />
							<span>Runs</span>
						</Link>
					</TabsTrigger>
					<TabsTrigger asChild value="snapshots">
						<Link to={routes.projects.pipelines.detail.snapshots(pipelineId)}>
							<TabIcon icon={SnapshotIcon} />
							<span>Snapshots</span>
						</Link>
					</TabsTrigger>
					<TabsTrigger asChild value="deployments">
						<Link to={routes.projects.pipelines.detail.deployments(pipelineId)}>
							<TabIcon icon={DeploymentIcon} />
							<span>Deployments</span>
						</Link>
					</TabsTrigger>
				</TabsList>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
