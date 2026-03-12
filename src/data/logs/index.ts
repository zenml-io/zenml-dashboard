import { LogEntriesQueryParams } from "@/types/logs";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchLogEntries, getLogEntriesQueryKey } from "./log-entries-query";

type LogEntriesInfiniteQuery = {
	logsId: string;
	queries?: Omit<LogEntriesQueryParams, "before" | "after">;
};

type LogEntriesCursorPageParam = {
	before: string | undefined;
	after: string | undefined;
};

export const logQueries = {
	logEntriesInfinite: ({ logsId, queries = {} }: LogEntriesInfiniteQuery) =>
		infiniteQueryOptions({
			queryKey: [...getLogEntriesQueryKey({ logsId }), queries, "infinite"],
			queryFn: ({ pageParam }) =>
				fetchLogEntries({
					logsId,
					queries: {
						...queries,
						before: pageParam.before,
						after: pageParam.after
					}
				}),
			getPreviousPageParam: (page) => {
				const before = page.before ?? "";
				return before ? { before, after: undefined } : undefined;
			},
			getNextPageParam: (page) => {
				const after = page.after ?? "";
				return after ? { before: undefined, after } : undefined;
			},
			initialPageParam: {
				before: undefined,
				after: undefined
			} as LogEntriesCursorPageParam
		})
};
