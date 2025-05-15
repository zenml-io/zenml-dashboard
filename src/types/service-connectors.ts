import { StackComponent } from "./components";
import { components, operations } from "./core";

export type ServiceConnectorType = components["schemas"]["ServiceConnectorTypeModel"];

export type ServiceConnectorInfo = components["schemas"]["ServiceConnectorInfo"];

export type ServiceConnectorResourceInfo = components["schemas"]["ServiceConnectorResourcesInfo"];

export type ComponentInfo = components["schemas"]["ComponentInfo"];

export type ComponentResourceInfo = {
	artifact_store: ServiceConnectorResourceInfoItem[];
	orchestrator: ServiceConnectorResourceInfoItem[];
	container_registry: ServiceConnectorResourceInfoItem[];
};
export type ServiceConnectorResourceInfoItem = {
	flavor: string;
	flavor_display_name: string;
	use_resource_value_as_fixed_config?: boolean;
	required_configuration?: Record<string, string>;
	accessible_by_service_connector: string[];
	connected_through_service_connector?: StackComponent[];
};

export type ServiceConnectorList = components["schemas"]["Page_ServiceConnectorResponse_"];
export type ServiceConnectorListQueryParams = NonNullable<
	operations["list_service_connectors_api_v1_service_connectors_get"]["parameters"]["query"]
>;

export type ServiceConnector = components["schemas"]["ServiceConnectorResponse"];

export type ConnectorType = components["schemas"]["ServiceConnectorTypeModel"];
export type ResourceType = components["schemas"]["ResourceTypeModel"];

export type ResourcesModel = components["schemas"]["ServiceConnectorResourcesModel"];
export type TypedResourceModel = components["schemas"]["ServiceConnectorTypedResourcesModel"];
