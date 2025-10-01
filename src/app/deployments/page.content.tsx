import { PipelineDeploymentsTable } from "@/components/deployments/list/table";
import { DeploymentsTableToolbar } from "@/components/deployments/list/toolbar";
import { useDeploymentQueryParams } from "@/components/deployments/list/use-deployment-queryparams";
import { DeploymentsListQueryParams } from "@/types/deployments";
import { useGlobalDeploymentColumns } from "./columns";

export function GlobalDeploymentsContent() {
	const columns = useGlobalDeploymentColumns();
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
