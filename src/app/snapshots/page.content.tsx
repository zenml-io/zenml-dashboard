import { PipelineSnapshotsTable } from "@/components/pipeline-snapshots/list/table";
import { SnapshotTableToolbar } from "@/components/pipeline-snapshots/list/toolbar";
import { useSnapshotListQueryParams } from "@/components/pipeline-snapshots/list/use-queryparams";
import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useGlobalSnapshotColumns } from "./columns";

export function GlobalSnapshotsContent() {
	const columns = useGlobalSnapshotColumns();
	const existingParams = useSnapshotListQueryParams();
	const searchParams: PipelineSnapshotListQueryParams = {
		named_only: true,
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<SnapshotTableToolbar displayCreateButton params={searchParams} />
			<PipelineSnapshotsTable params={searchParams} columns={columns} />
		</>
	);
}
