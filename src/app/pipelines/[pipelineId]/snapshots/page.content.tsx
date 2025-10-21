import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useParams } from "react-router-dom";
import { SnapshotTableToolbar } from "@/components/pipeline-snapshots/list/toolbar";
import { PipelineSnapshotsTable } from "@/components/pipeline-snapshots/list/table";
import { useSnapshotListQueryParams } from "@/components/pipeline-snapshots/list/use-queryparams";
import { usePipelineSnapshotColumns } from "./columns";

export function PipelineSnapshotsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = useSnapshotListQueryParams();

	const columns = usePipelineSnapshotColumns();

	const searchParams: PipelineSnapshotListQueryParams = {
		pipeline: pipelineId,
		named_only: true,
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<SnapshotTableToolbar params={searchParams} />
			<PipelineSnapshotsTable params={searchParams} columns={columns} />
		</>
	);
}
