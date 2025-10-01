import { PipelineDeploymentsTable } from "@/components/deployments/list/table";
import { DeploymentsTableToolbar } from "@/components/deployments/list/toolbar";
import { useDeploymentQueryParams } from "@/components/deployments/list/use-deployment-queryparams";
import { DeploymentsListQueryParams } from "@/types/deployments";
import { useParams } from "react-router-dom";
import { usePipelineDeploymentColumns } from "./columns";

export function PipelineDeploymentsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = useDeploymentQueryParams();
	const columns = usePipelineDeploymentColumns();

	const searchParams: DeploymentsListQueryParams = {
		...existingParams,
		pipeline: pipelineId,
		sort_by: "desc:updated"
	};

	return (
		<>
			<DeploymentsTableToolbar params={searchParams} />
			<PipelineDeploymentsTable params={searchParams} columns={columns} />
		</>
	);
}
