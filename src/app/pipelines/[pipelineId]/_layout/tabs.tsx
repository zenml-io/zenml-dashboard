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
				<TabsList className="flex-nowrap border-none">
					<TabsTrigger asChild value="runs">
						<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
							<span>Runs</span>
						</Link>
					</TabsTrigger>
				</TabsList>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
