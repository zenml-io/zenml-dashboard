import { queryOptions } from "@tanstack/react-query";
import { fetchRunWaitCondition } from "./fetch-condition";

export const waitConditionQueries = {
	all: ["wait-conditions"],
	detail: (waitConditionId: string) =>
		queryOptions({
			queryKey: [...waitConditionQueries.all, waitConditionId],
			queryFn: async () => fetchRunWaitCondition(waitConditionId)
		})
};
