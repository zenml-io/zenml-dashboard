import { getPipelineDetailColumns } from "@/app/pipelines/[pipelineId]/runs/columns";
import { RunsTableToolbar } from "@/app/pipelines/[pipelineId]/runs/runs-table-toolbar";
import { PipelineRunsTable } from "@/app/pipelines/[pipelineId]/runs/RunsTable";
import { usePipelineRunParams } from "@/app/pipelines/[pipelineId]/runs/service";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useParams } from "react-router-dom";

export function DeploymentRunsContent() {
	const params = usePipelineRunParams();
	const columns = getPipelineDetailColumns();

	const { deploymentId } = useParams() as {
		deploymentId: string;
	};

	const searchParams: PipelineRunOvervieweParams = {
		triggered_by_deployment_id: deploymentId,
		...params
	};

	return (
		<>
			<RunsTableToolbar params={searchParams} />
			<PipelineRunsTable columns={columns} params={searchParams} />
		</>
	);
}
