import InfoIcon from "@/assets/icons/info.svg?react";
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

export function DeploymentDetailTabs() {
	const { deploymentId } = useParams() as { deploymentId: string };
	const activeTab = useActiveTab();
	return (
		<Tabs value={activeTab}>
			<ScrollArea>
				<TabsList className="flex-nowrap border-none [&_*]:flex [&_*]:items-center [&_*]:gap-1">
					<TabsTrigger asChild value="overview">
						<Link to={routes.projects.deployments.detail.overview(deploymentId)}>
							<TabIcon icon={InfoIcon} />
							<span>Overview</span>
						</Link>
					</TabsTrigger>
				</TabsList>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
