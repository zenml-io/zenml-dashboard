import { useWizardContext } from "@/context/WizardContext";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { Controller, useFormContext } from "react-hook-form";

import { CloudProviderIcon } from "@/components/ProviderIcon";
import { useSchemaContext } from "@/context/SchemaContext";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { getZodSchemaFromConfig } from "@/lib/forms";
import { JSONSchema } from "@/types/forms";
import { StackDeploymentProvider } from "@/types/stack";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { newConnectorBaseSchema } from "./schema";
import { generateDefaultValues } from "@/components/form/helper";

export function AuthMethodSelect() {
	const { data } = useExistingInfraContext();
	const { setCurrentStep } = useWizardContext();
	const { control, watch, resetField } = useFormContext();
	const { setSchema, setDefaultValues } = useSchemaContext();
	const connectorTypes = useQuery({
		...serviceConnectorQueries.serviceConnectorTypeDetail(data.connectorConfig?.type || "")
	});

	if (connectorTypes.isError) return null;
	if (connectorTypes.isPending) return <Skeleton className="h-[40px] w-[100px]" />;

	const methods = connectorTypes.data.auth_methods
		.filter((method) => method.auth_method !== "implicit")
		.map((method) => ({ name: method.name, auth_method: method.auth_method }));
	if (!data.connectorConfig?.type) {
		setCurrentStep(1);
		return;
	}

	function handleChange() {
		const selectedAuthMethod = watch("authMethod");
		const authMethod = connectorTypes.data?.auth_methods.find(
			(method) => method.auth_method === selectedAuthMethod
		);
		if (!authMethod) return;

		const configSchema = authMethod.config_schema as JSONSchema;

		const schema = getZodSchemaFromConfig(configSchema);
		const defaultValues = generateDefaultValues(configSchema);
		setSchema(newConnectorBaseSchema.merge(schema));
		setDefaultValues(defaultValues);
		const fields = Object.keys(schema.shape);
		fields.forEach((field) => resetField(field));
	}

	const provider = data.connectorConfig.type || "";

	return (
		<Controller
			control={control}
			name="authMethod"
			render={({ field: { onChange, ref, ...rest } }) => (
				<Select
					{...rest}
					onValueChange={(val) => {
						onChange(val);
						handleChange();
					}}
				>
					<SelectTrigger className="w-fit border border-neutral-300 text-left text-text-md">
						<SelectValue
							className="flex items-center gap-2"
							placeholder="Select your Auth Method"
						/>
					</SelectTrigger>
					<SelectContent>
						<ScrollArea viewportClassName="max-h-[300px]">
							{methods.map((method) => (
								<SelectItem
									className="space-x-2"
									key={method.auth_method}
									value={method.auth_method}
								>
									<div className="flex items-center gap-2">
										<CloudProviderIcon provider={provider as StackDeploymentProvider} />
										<div>{method.name}</div>
									</div>
								</SelectItem>
							))}
						</ScrollArea>
					</SelectContent>
				</Select>
			)}
		/>
	);
}
