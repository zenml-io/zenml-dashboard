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
				<TabsList className="flex-nowrap border-none">
					<TabsTrigger asChild value="overview">
						<Link to={routes.projects.deployments.detail.overview(deploymentId)}>
							<span>Overview</span>
						</Link>
					</TabsTrigger>
				</TabsList>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
