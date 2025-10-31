import { PipelineSnapshotsTable } from "@/components/pipeline-snapshots/list/table";
import { SnapshotTableToolbar } from "@/components/pipeline-snapshots/list/toolbar";
import { useSnapshotListQueryParams } from "@/components/pipeline-snapshots/list/use-queryparams";
import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useGlobalSnapshotColumns } from "./columns";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import EmptySnapshots from "@/assets/illustrations/empty-snapshots.svg?react";
import { Button } from "@zenml-io/react-component-library";
import Plus from "@/assets/icons/plus.svg?react";

export function GlobalSnapshotsContent() {
	const columns = useGlobalSnapshotColumns();
	const existingParams = useSnapshotListQueryParams();
	const searchParams: PipelineSnapshotListQueryParams = {
		named_only: true,
		...existingParams,
		sort_by: "desc:updated"
	};

	const { data, isPending, isError } = useQuery({
		// empty params since we want to check if there are any results regardless of the search filter.
		...pipelineSnapshotQueries.list({ named_only: true }),
		throwOnError: true
	});

	if (isPending) {
		return null;
	}

	if (isError) {
		return <div>Error loading snapshots</div>;
	}

	if (data.items.length === 0) {
		return <EmptyState />;
	}

	return (
		<>
			<SnapshotTableToolbar displayCreateButton params={searchParams} />
			<PipelineSnapshotsTable params={searchParams} columns={columns} />
		</>
	);
}

function EmptyState() {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-5">
			<EmptySnapshots />
			<h2 className="text-display-xs font-semibold">No Snapshots Available</h2>
			<div className="text-center text-theme-text-secondary">
				<p>It looks like there are no snapshots created yet.</p>
				<p>Run a pipeline in a remote stack to get started.</p>
			</div>
			<div className="flex justify-center">
				<Button>
					<Plus className="h-5 w-5 shrink-0 fill-white" />
					New Snapshot
				</Button>
			</div>
		</div>
	);
}
