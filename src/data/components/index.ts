import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
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
		}),
	componentList: (queryParams: StackComponentListParams) =>
		queryOptions({
			queryKey: [...componentQueries.all, queryParams],
			queryFn: async () => fetchComponents(queryParams)
		})
};
