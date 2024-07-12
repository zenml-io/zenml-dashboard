import {
	StackDeploymentInfoQueryParams,
	StackDeploymentStackQueryParams,
	StackListQueryParams
} from "@/types/stack";
import { queryOptions } from "@tanstack/react-query";
import { fetchStacks } from "./stacklist-query";
import { fetchStackDeploymentInfo } from "./stack-deployment-info";
import { fetchStackDeploymentStack } from "./stack-deployment-stack";
import { fetchStack } from "./stack-detail-query";

export const stackQueries = {
	all: ["stacks"],
	stackDeployment: ["stack-deployment"],
	stackList: (queryParams: StackListQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.all, queryParams],
			queryFn: async () => fetchStacks(queryParams)
		}),
	stackDetail: (stackId: string) =>
		queryOptions({
			queryKey: [...stackQueries.all, stackId],
			queryFn: async () => fetchStack({ stackId })
		}),
	stackDeploymentInfo: (queryParams: StackDeploymentInfoQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.stackDeployment, "info", queryParams],
			queryFn: async () => fetchStackDeploymentInfo(queryParams)
		}),
	stackDeploymentStack: (queryParams: StackDeploymentStackQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.stackDeployment, "stack", queryParams],
			queryFn: async () => fetchStackDeploymentStack(queryParams)
		})
};
