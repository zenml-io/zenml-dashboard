import { queryOptions } from "@tanstack/react-query";
import { fetchPipelineDeployment } from "./pipeline-deployments-detail";

export const pipelineDeploymentQueries = {
	all: ["pipeline_deployments"],
	detail: (deploymentId: string) =>
		queryOptions({
			queryKey: [...pipelineDeploymentQueries.all, deploymentId],
			queryFn: async () => fetchPipelineDeployment({ deploymentId })
		})
};
