import { DeploymentsListQueryParams } from "@/types/deployments";
import { PipelineDeploymentsTable } from "./table";
import { DeploymentsTableToolbar } from "./toolbar";
import { usePipelineDeploymentParams } from "./use-queryparams";

export function PipelineDeploymentsContent() {
	// const { pipelineId } = useParams() as { pipelineId: string };
	const existingParams = usePipelineDeploymentParams();

	const searchParams: DeploymentsListQueryParams = {
		...existingParams,
		sort_by: "desc:updated"
	};

	return (
		<>
			<DeploymentsTableToolbar params={searchParams} />
			<PipelineDeploymentsTable params={searchParams} />
		</>
	);
}
