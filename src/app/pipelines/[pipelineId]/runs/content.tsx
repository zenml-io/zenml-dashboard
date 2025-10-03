import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useParams } from "react-router-dom";
import { getPipelineDetailColumns } from "./columns";
import { RunsTableToolbar } from "./runs-table-toolbar";
import { PipelineRunsTable } from "./RunsTable";
import { usePipelineRunParams } from "./service";
import { useMemo } from "react";

export function PipelineRunsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = usePipelineRunParams();
	const columns = useMemo(() => {
		return getPipelineDetailColumns();
	}, []);

	const searchParams: PipelineRunOvervieweParams = {
		pipeline_id: pipelineId,
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<RunsTableToolbar params={searchParams} />
			<PipelineRunsTable columns={columns} params={searchParams} />
		</>
	);
}
