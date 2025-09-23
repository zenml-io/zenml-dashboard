"use client";

import { RunsTableToolbar } from "@/app/pipelines/[pipelineId]/runs/runs-table-toolbar";
import { PipelineRunsTable } from "@/app/pipelines/[pipelineId]/runs/RunsTable";
import { usePipelineRunParams } from "@/app/pipelines/[pipelineId]/runs/service";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useParams } from "react-router-dom";

export function SnapshotDetailRunsContent() {
	const params = usePipelineRunParams();

	const { snapshotId } = useParams() as {
		snapshotId: string;
	};

	const searchParams: PipelineRunOvervieweParams = {
		source_snapshot_id: snapshotId,

		...params
	};

	return (
		<>
			<RunsTableToolbar params={searchParams} />
			<PipelineRunsTable params={searchParams} />
		</>
	);
}
