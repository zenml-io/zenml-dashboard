import Lock from "@/assets/icons/Lock.svg?react";
import { getisOptional } from "@/lib/forms";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useFormContext } from "react-hook-form";
import { ConnectorConfigForm } from "./schema";
import { useRegisterConnectorContext } from "../create-context";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useQuery } from "@tanstack/react-query";
import { JSONSchema } from "@/types/forms";
import { DynamicField } from "@/components/form/form";
import { SkipVerify } from "./skip-verify";
import { VerifyConnectorButton } from "./verify-connector-button";
type Props = {
	user: string;
};
export function ConfigSection({ user }: Props) {
	return (
		<section className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Lock width={24} height={24} className="shrink-0 fill-primary-400" />
					<p className="text-text-lg font-semibold">Add your configuration</p>
				</div>
				<p className="text-theme-text-secondary">
					Your credentials are securely stored and encrypted. ZenML uses these credentials to
					interact with your resources.
				</p>
			</div>
			<ConfigForm user={user} />
		</section>
	);
}

function ConfigForm({ user }: Props) {
	const { getValues } = useFormContext<ConnectorConfigForm>();
	const { connectorType } = useRegisterConnectorContext();
	const typeQuery = useQuery(serviceConnectorQueries.serviceConnectorTypeDetail(connectorType));

	if (typeQuery.isError) return <p>Failed to fetch Connector Type {connectorType}</p>;
	if (typeQuery.isPending) return <Skeleton className="h-7 w-full" />;

	const type = typeQuery.data;

	const authMethod = type.auth_methods.find(
		(method) => method.auth_method === getValues("authMethod")
	);

	if (!authMethod) return null;

	const schema = authMethod.config_schema as JSONSchema;

	const properties = schema.properties || {};
	const required = schema.required || [];
	const defs = schema.$defs;

	// sort required properties first
	const sortedProperties = Object.entries(properties).sort(([key1], [key2]) => {
		if (required.includes(key1) && !required.includes(key2)) return -1;
		if (!required.includes(key1) && required.includes(key2)) return 1;
		return 0;
	});

	return (
		<div className="space-y-5">
			{sortedProperties.map(([key, value]) => (
				<DynamicField
					definitions={defs}
					isOptional={getisOptional(key, required)}
					key={key}
					name={key}
					schema={value}
				/>
			))}
			<VerifyConnectorButton mandatoryFields={required} user={user} />
			<SkipVerify />
		</div>
	);
}
