import { StackListQueryParams } from "@/types/stack";
import { queryOptions } from "@tanstack/react-query";
import { fetchStacks } from "./stacklist-query";

export const stackQueries = {
	all: ["stacks"],
	stackList: (queryParams: StackListQueryParams) =>
		queryOptions({
			queryKey: [...stackQueries.all, queryParams],
			queryFn: async () => fetchStacks(queryParams)
		})
};
