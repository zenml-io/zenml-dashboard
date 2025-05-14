import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchServiceConnectorType } from "./connector-type-detail";
import { ServiceConnectorListQueryParams } from "../../types/service-connectors";
import { fetchServiceConnectorList } from "./connector-list";

export const serviceConnectorQueries = {
	connectorTypes: ["service_connector_types"],
	connectors: ["service_connectors"] as const,
	serviceConnectorTypeDetail: (connectorType: string) =>
		queryOptions({
			queryKey: [...serviceConnectorQueries.connectorTypes, connectorType],
			queryFn: async () => fetchServiceConnectorType(connectorType)
		}),
	serviceConnectorList: (params: ServiceConnectorListQueryParams = {}) =>
		queryOptions({
			queryKey: [...serviceConnectorQueries.connectors, params],
			queryFn: () => fetchServiceConnectorList(params)
		}),
	serviceConnectorListInfinite: (params: ServiceConnectorListQueryParams = {}) =>
		infiniteQueryOptions({
			queryKey: [...serviceConnectorQueries.connectors, params, "infinite"],
			queryFn: ({ pageParam }) => fetchServiceConnectorList({ ...params, page: pageParam }),
			getNextPageParam: (lastPage) =>
				lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
			initialPageParam: 1
		})
};
