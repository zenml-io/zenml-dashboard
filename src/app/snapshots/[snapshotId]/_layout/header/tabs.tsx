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

export function SnapshotDetailTabs() {
	const { snapshotId } = useParams() as {
		snapshotId: string;
	};
	const activeTab = useActiveTab();

	return (
		<Tabs value={activeTab}>
			<ScrollArea>
				<div className="flex items-end justify-between gap-3">
					<TabsList className="flex-nowrap border-none">
						<TabsTrigger asChild value="overview">
							<Link to={routes.projects.snapshots.detail.overview(snapshotId)}>
								<span>Overview</span>
							</Link>
						</TabsTrigger>
						<TabsTrigger asChild value="runs">
							<Link to={routes.projects.snapshots.detail.runs(snapshotId)}>
								<span>Runs</span>
							</Link>
						</TabsTrigger>
					</TabsList>
				</div>
				<ScrollBar className="" orientation="horizontal" />
			</ScrollArea>
		</Tabs>
	);
}
