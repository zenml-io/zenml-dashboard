import { DeploymentsListQueryParams } from "@/types/deployments";
import { queryOptions } from "@tanstack/react-query";
import { fetchDeploymentsList } from "./fetch-list";
import { fetchDeploymentDetail } from "./fetch-detail";

export const deploymentQueries = {
	all: ["deployments"] as const,
	detail: (deploymentId: string) =>
		queryOptions({
			queryKey: [...deploymentQueries.all, deploymentId],
			queryFn: async () => fetchDeploymentDetail({ deploymentId })
		}),
	list: (queryParams: DeploymentsListQueryParams) =>
		queryOptions({
			queryKey: [...deploymentQueries.all, queryParams],
			queryFn: async () => fetchDeploymentsList({ params: queryParams })
		})
};
