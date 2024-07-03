import { StackDeploymentInfoQueryParams, StackListQueryParams } from "@/types/stack";
import { queryOptions } from "@tanstack/react-query";
import { fetchStacks } from "./stacklist-query";
import { fetchStackDeploymentInfo } from "./stack-deployment-info";

export const stackQueries = {
	all: ["stacks"],
	stackDeployment: ["stack-deployment"],
	stackList: (queryParams: StackListQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.all, queryParams],
			queryFn: async () => fetchStacks(queryParams)
		}),
	stackDeploymentInfo: (queryParams: StackDeploymentInfoQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.stackDeployment, "info", queryParams],
			queryFn: async () => fetchStackDeploymentInfo(queryParams)
		})
};
