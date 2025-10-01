import { PipelineDeploymentsTable } from "@/components/deployments/list/table";
import { DeploymentsTableToolbar } from "@/components/deployments/list/toolbar";
import { DeploymentsListQueryParams } from "@/types/deployments";
import { useDeploymentColumns } from "./columns";
import { useDeploymentQueryParams } from "@/components/deployments/list/use-deployment-queryparams";

export function GlobalDeploymentsContent() {
	const columns = useDeploymentColumns();
	const existingParams = useDeploymentQueryParams();

	const searchParams: DeploymentsListQueryParams = {
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<DeploymentsTableToolbar params={searchParams} />
			<PipelineDeploymentsTable params={searchParams} columns={columns} />
		</>
	);
}
