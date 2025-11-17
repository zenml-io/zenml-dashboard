import EmptySnapshot from "@/assets/illustrations/empty-snapshot.svg";
import { PipelineSnapshotsTable } from "@/components/pipeline-snapshots/list/table";
import { SnapshotTableToolbar } from "@/components/pipeline-snapshots/list/toolbar";
import { useSnapshotListQueryParams } from "@/components/pipeline-snapshots/list/use-queryparams";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@zenml-io/react-component-library/components/server";
import { routes } from "@/router/routes";
import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useGlobalSnapshotColumns } from "./columns";
import { Link } from "react-router-dom";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";

export function GlobalSnapshotsContent() {
	const columns = useGlobalSnapshotColumns();
	const existingParams = useSnapshotListQueryParams();
	const searchParams: PipelineSnapshotListQueryParams = {
		named_only: true,
		...existingParams,
		sort_by: "desc:updated"
	};

	const snapshotListQuery = useQuery({ ...pipelineSnapshotQueries.list(searchParams) });

	if (snapshotListQuery.isSuccess && snapshotListQuery.data.items.length === 0) {
		return <GlobalSnapshotsEmptyState />;
	}

	return (
		<>
			<SnapshotTableToolbar displayCreateButton params={searchParams} />
			<PipelineSnapshotsTable params={searchParams} columns={columns} />
		</>
	);
}

function GlobalSnapshotsEmptyState() {
	return (
		<EmptyState className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
			<div className="flex max-w-[520px] flex-col items-center gap-5">
				<img src={EmptySnapshot} alt="Empty snapshots" className="h-[120px] w-[120px]" />
				<div className="space-y-2">
					<p className="text-display-xs font-semibold">No snapshots available</p>
					<p className="text-lg text-theme-text-secondary">
						It looks like there are no snapshots created yet.
						<br />
						Run a pipeline in a remote stack to get started.
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-center gap-3">
					<Button size="md" intent="primary" asChild>
						<Link to={routes.projects.snapshots.create}>New Snapshot</Link>
					</Button>
					<Button size="md" intent="secondary" emphasis="minimal" asChild>
						<a
							href="https://docs.zenml.io/user-guides/starter-guide/create-an-ml-pipeline"
							target="_blank"
							rel="noreferrer"
						>
							Browse the docs
						</a>
					</Button>
				</div>
			</div>
		</EmptyState>
	);
}
