import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchFlavors } from "./flavors-list";
import { FlavorListQueryParams } from "@/types/flavors";
import { fetchFlavorDetail } from "./flavor-detail";

export const flavorQueries = {
	all: ["flavors"],
	flavorList: (queryParams: FlavorListQueryParams) =>
		queryOptions({
			queryKey: [...flavorQueries.all, queryParams],
			queryFn: async () => fetchFlavors(queryParams)
		}),
	flavorDetail: (flavorId: string) =>
		queryOptions({
			queryKey: [...flavorQueries.all, flavorId],
			queryFn: async () => fetchFlavorDetail(flavorId)
		}),
	flavorListInfinite: (queryParams: FlavorListQueryParams) =>
		infiniteQueryOptions({
			queryKey: [...flavorQueries.all, queryParams, "infinite"],
			queryFn: ({ pageParam }) => fetchFlavors({ ...queryParams, page: pageParam }),
			getNextPageParam: (lastPage) =>
				lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
			initialPageParam: 1
		})
};
