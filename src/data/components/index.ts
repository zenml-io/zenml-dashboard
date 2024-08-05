import { infiniteQueryOptions } from "@tanstack/react-query";
import { fetchComponents } from "./components-list";
import { StackComponentListParams } from "@/types/components";

export const componentQueries = {
	all: ["components"],
	componentListInfinite: (queryParams: StackComponentListParams) =>
		infiniteQueryOptions({
			queryKey: [...componentQueries.all, queryParams],
			queryFn: async ({ pageParam }) => fetchComponents({ ...queryParams, page: pageParam }),
			getNextPageParam: (lastPage) =>
				lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
			initialPageParam: 1
		})

	// This is not used for now, in case we need the infinite query, and the regular one, the queryKeys should not be the same

	// componentList: (backendUrl: string, queryParams: StackComponentListParams) =>
	// 	queryOptions({
	// 		queryKey: [backendUrl, ...componentQueries.all, queryParams],
	// 		queryFn: async () => fetchComponents(backendUrl, queryParams)
	// 	})
};
