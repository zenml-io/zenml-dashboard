import { StackComponent } from "./components";
import { components } from "./core";

export type ServiceConnectorType = components["schemas"]["ServiceConnectorTypeModel"];

export type ConnectorConfigPropertiesBody = {
	type?: string;
	anyOf?: AnyOf[];
	title: string;
	format?: string;
	default?: boolean | null;
};

type AnyOf = {
	type: string | null;
	items?: { type: string };
};

export type ConnectorConfigProperties = { [key: string]: ConnectorConfigPropertiesBody };

export type ServiceConnectorConfigSchema = {
	required: string[];
	title: string;
	type: string;
	description: string;
	properties: ConnectorConfigProperties;
};

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
