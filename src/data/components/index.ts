import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchComponents } from "./components-list";
import { StackComponentListParams } from "@/types/components";
import { fetchComponentDetail } from "./component-detail-query";

export const componentQueries = {
	all: ["components"],
	componentListInfinite: (queryParams: StackComponentListParams) =>
		infiniteQueryOptions({
			queryKey: [...componentQueries.all, queryParams, "infinite"],
			queryFn: async ({ pageParam }) => fetchComponents({ ...queryParams, page: pageParam }),
			getNextPageParam: (lastPage) =>
				lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
			initialPageParam: 1
		}),
	componentList: (queryParams: StackComponentListParams) =>
		queryOptions({
			queryKey: [...componentQueries.all, queryParams],
			queryFn: async () => fetchComponents(queryParams)
		}),
	componentDetail: (componentId: string) =>
		queryOptions({
			queryKey: [...componentQueries.all, componentId],
			queryFn: async () => fetchComponentDetail(componentId)
		})
};
