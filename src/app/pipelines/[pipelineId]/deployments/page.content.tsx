import { DeploymentsListQueryParams } from "@/types/deployments";
import { PipelineDeploymentsTable } from "./table";
import { DeploymentsTableToolbar } from "./toolbar";
import { usePipelineDeploymentParams } from "./use-queryparams";
import { useParams } from "react-router-dom";

export function PipelineDeploymentsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = usePipelineDeploymentParams();

	const searchParams: DeploymentsListQueryParams = {
		...existingParams,
		pipeline: pipelineId,
		sort_by: "desc:updated"
	};

	return (
		<>
			<DeploymentsTableToolbar params={searchParams} />
			<PipelineDeploymentsTable params={searchParams} />
		</>
	);
}
