import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { usePipelineRunParams } from "./service";
import { useParams } from "react-router-dom";
import { RunsTableToolbar } from "./runs-table-toolbar";
import { PipelineRunsTable } from "./RunsTable";

export function PipelineRunsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = usePipelineRunParams();

	const searchParams: PipelineRunOvervieweParams = {
		pipeline_id: pipelineId,
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<RunsTableToolbar params={searchParams} />
			<PipelineRunsTable params={searchParams} />
		</>
	);
}
