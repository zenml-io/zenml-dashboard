import { DeploymentsListQueryParams } from "@/types/deployments";
import { DeploymentsTableToolbar } from "@/components/deployments/list/toolbar";
import { useDeploymentQueryParams } from "@/components/deployments/list/use-deployment-queryparams";
import { useParams } from "react-router-dom";
import { PipelineDeploymentsTable } from "@/components/deployments/list/table";
import { useDeploymentColumns } from "./columns";

export function PipelineDeploymentsContent() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = useDeploymentQueryParams();
	const columns = useDeploymentColumns();

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
