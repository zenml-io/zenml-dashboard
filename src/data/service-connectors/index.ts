import { queryOptions } from "@tanstack/react-query";
import { fetchServiceConnectorType } from "./connector-type-detail";

export const serviceConnectorQueries = {
	connectorTypes: ["service_connector_types"],
	serviceConnectorTypeDetail: (connectorType: string) =>
		queryOptions({
			queryKey: [...serviceConnectorQueries.connectorTypes, connectorType],
			queryFn: async () => fetchServiceConnectorType(connectorType)
		})
};
