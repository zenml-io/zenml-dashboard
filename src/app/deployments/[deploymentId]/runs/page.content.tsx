"use client";

import { getPipelineDetailColumns } from "@/app/pipelines/[pipelineId]/runs/columns";
import { PipelineRunsTable } from "@/app/pipelines/[pipelineId]/runs/RunsTable";
import { usePipelineRunParams } from "@/app/pipelines/[pipelineId]/runs/service";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { useParams } from "react-router-dom";
import { DeploymentRunsTableToolbar } from "./runs-table-toolbar";

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
			<DeploymentRunsTableToolbar params={searchParams} />
			<PipelineRunsTable columns={columns} params={searchParams} />
		</>
	);
}
