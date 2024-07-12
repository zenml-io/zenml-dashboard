import { queryOptions } from "@tanstack/react-query";
import { fetchFlavors } from "./flavors-list";
import { FlavorListQueryParams } from "@/types/flavors";

export const flavorQueries = {
	all: ["flavors"],
	flavorList: (queryParams: FlavorListQueryParams) =>
		queryOptions({
			queryKey: [...flavorQueries.all, queryParams],
			queryFn: async () => fetchFlavors(queryParams)
		})
};
