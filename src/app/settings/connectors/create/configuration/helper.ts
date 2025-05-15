import { ServiceConnectorRequest } from "@/types/service-connectors";
import { ConnectorConfigForm } from "./schema";

export function constructPayload({
	name,
	authMethod,
	connectorType,
	user,
	workspace,
	resourceType,
	description,
	isValid,
	skipValidation,
	...rest
}: ConnectorConfigForm & {
	connectorType: string;
	user: string;
}): ServiceConnectorRequest {
	Object.keys(rest).forEach((key) => {
		if (
			rest[key] === "" ||
			rest[key] === null ||
			rest[key] === undefined ||
			(Array.isArray(rest[key]) && (rest[key] as unknown[]).length === 0) ||
			(typeof rest[key] === "object" &&
				!Array.isArray(rest[key]) &&
				Object.keys(rest[key] as Record<string, unknown>).length === 0)
		) {
			delete rest[key];
		}
	});
	const payload: ServiceConnectorRequest = {
		name,
		auth_method: authMethod,
		connector_type: connectorType,
		resource_types: resourceType === "all" ? undefined : [resourceType],
		description: description ? description : undefined,
		configuration: rest,
		user
	};

	return payload;
}
