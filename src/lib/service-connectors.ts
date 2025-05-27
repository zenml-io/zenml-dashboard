import { ResourceType, ServiceConnector } from "@/types/service-connectors";
import { isString } from "./type-guards";

export function extractResourceTypes(connector: ServiceConnector): ResourceType[] {
	const resourceTypes = connector.body?.resource_types ?? [];
	const connectorType = connector.body?.connector_type;
	if (isString(connectorType)) return [];
	const configResourceTypes = connectorType?.resource_types ?? [];

	return configResourceTypes.filter((configResourceType) =>
		resourceTypes.includes(configResourceType.resource_type)
	);
}

export function extractAuthMethod(connector: ServiceConnector) {
	const authMethod = connector.body?.auth_method || "";
	const connectorType = connector.body?.connector_type;
	if (isString(connectorType)) return undefined;
	const configAuthMethods = connectorType?.auth_methods ?? [];
	return configAuthMethods.find((configAuthMethod) => configAuthMethod.auth_method === authMethod);
}
