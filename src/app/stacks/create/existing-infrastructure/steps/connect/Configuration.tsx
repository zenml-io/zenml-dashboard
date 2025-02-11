import Lock from "@/assets/icons/Lock.svg?react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useFormContext } from "react-hook-form";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { JSONSchema } from "@/types/forms";
import { DynamicField } from "@/components/form/form";
import { getisOptional } from "@/lib/forms";

export function ConnectorConfig() {
	return (
		<section className="space-y-5 py-5 first:pt-0 last:pb-0">
			<div className="space-y-1">
				<p className="flex items-center gap-1 text-text-lg font-semibold">
					<Lock className="h-5 w-5 fill-primary-400" />
					Add your Configuration
				</p>
				<p className="text-theme-text-secondary">
					Your credentials are securely stored and encrypted. ZenML uses these credentials to
					interact with your resources.
				</p>
			</div>
			<ConfigForm />
		</section>
	);
}

function ConfigForm() {
	const { data } = useExistingInfraContext();
	const { watch } = useFormContext();
	const connectorTypes = useQuery({
		...serviceConnectorQueries.serviceConnectorTypeDetail(data.connectorConfig?.type || "")
	});

	const selectedAuthMethod = watch("authMethod");

	const authMethod = connectorTypes.data?.auth_methods.find(
		(method) => method.auth_method === selectedAuthMethod
	);

	if (connectorTypes.isError) return null;
	if (connectorTypes.isPending) return <Skeleton className="h-[200px] w-full" />;

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
		</div>
	);
}
