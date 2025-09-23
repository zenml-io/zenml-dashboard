import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useParams } from "react-router-dom";
import { SnapshotTableToolbar } from "./toolbar";
import { PipelineSnapshotsTable } from "./table";
import { usePipelineSnapshotParams } from "./use-queryparams";

export function PipelineSnapshotsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = usePipelineSnapshotParams();

	const searchParams: PipelineSnapshotListQueryParams = {
		pipeline: pipelineId,
		named_only: true,
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<SnapshotTableToolbar params={searchParams} />
			<PipelineSnapshotsTable params={searchParams} />
		</>
	);
}
