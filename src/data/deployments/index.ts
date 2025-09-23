import { DeploymentsListQueryParams } from "@/types/deployments";
import { queryOptions } from "@tanstack/react-query";
import { fetchDeploymentsList } from "./fetch-list";

export const deploymentQueries = {
	all: ["deployments"] as const,

	list: (queryParams: DeploymentsListQueryParams) =>
		queryOptions({
			queryKey: [...deploymentQueries.all, queryParams],
			queryFn: async () => fetchDeploymentsList({ params: queryParams })
		})
};
