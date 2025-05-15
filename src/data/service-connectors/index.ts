import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchServiceConnectorType } from "./connector-type-detail";
import {
	ServiceConnectorListQueryParams,
	ServiceConnectorTypeListQueryParams
} from "../../types/service-connectors";
import { fetchServiceConnectorList } from "./connector-list";
import { fetchServiceConnectorDetail } from "./connector-detail";
import { fetchServiceConnectorTypeList } from "./connector-type-list";

export const serviceConnectorQueries = {
	connectorTypes: ["service_connector_types"],
	connectors: ["service_connectors"] as const,
	serviceConnectorTypeList: (params: ServiceConnectorTypeListQueryParams = {}) =>
		queryOptions({
			queryKey: [...serviceConnectorQueries.connectorTypes, params],
			queryFn: () => fetchServiceConnectorTypeList(params)
		}),
	serviceConnectorDetail: (connectorId: string) =>
		queryOptions({
			queryKey: [...serviceConnectorQueries.connectors, connectorId],
			queryFn: async () => fetchServiceConnectorDetail(connectorId)
		}),
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
