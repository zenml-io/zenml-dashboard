import Transform from "@/assets/icons/transform.svg?react";
import { generateDefaultValues } from "@/components/form/helper";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { getZodSchemaFromConfig } from "@/lib/forms";
import { JSONSchema } from "@/types/forms";
import { useQuery } from "@tanstack/react-query";
import {
	ScrollArea,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { Controller, useFormContext } from "react-hook-form";
import { ZodSchema } from "zod";
import { useRegisterConnectorContext } from "../create-context";
import { useNameSchema } from "./name-schema";
import { ConnectorConfigForm } from "./schema";

type Props = {
	setSchema: (schema: ZodSchema) => void;
	setConfigDefaultValues: (values: Record<string, unknown>) => void;
};

export function AuthMethodSection({ setConfigDefaultValues, setSchema }: Props) {
	return (
		<section className="space-y-5">
			<div className="space-y-1">
				<div className="flex items-center gap-1">
					<Transform width={24} height={24} className="shrink-0 fill-primary-400" />
					<p className="text-text-lg font-semibold">Select an Authentication Method</p>
				</div>
				<p className="text-theme-text-secondary">
					Connect ZenML to your cloud provider for seamless integration of cloud services into your
					ML pipelines.
				</p>
			</div>
			<AuthMethodSelect setConfigDefaultValues={setConfigDefaultValues} setSchema={setSchema} />
		</section>
	);
}

function AuthMethodSelect({ setConfigDefaultValues, setSchema }: Props) {
	const { control, resetField } = useFormContext<ConnectorConfigForm>();
	const baseSchema = useNameSchema("");
	const { connectorType } = useRegisterConnectorContext();
	const typeQuery = useQuery(serviceConnectorQueries.serviceConnectorTypeDetail(connectorType));

	if (typeQuery.isError) return <p>Failed to fetch Connector Type {connectorType}</p>;
	if (typeQuery.isPending) return <Skeleton className="h-7 w-full" />;

	const type = typeQuery.data;

	const methods = type.auth_methods.filter((method) => method.auth_method !== "implicit");

	function handleAuthMethodChange(val: string) {
		const method = methods.find((method) => method.auth_method === val);
		if (!method) return;
		const configSchema = method.config_schema as JSONSchema;
		const schema = getZodSchemaFromConfig(configSchema);
		const defaultValues = generateDefaultValues(configSchema);
		setConfigDefaultValues(defaultValues);
		setSchema(baseSchema.merge(schema));
		const fields = Object.keys(schema.shape);
		fields.forEach((f) => resetField(f));
	}

	return (
		<Controller
			control={control}
			name="authMethod"
			render={({ field, formState: { errors } }) => (
				<div className="space-y-1">
					<Select
						onValueChange={(val) => {
							field.onChange(val);
							handleAuthMethodChange(val);
						}}
						defaultValue={field.value}
					>
						<SelectTrigger
							data-error={!!errors.authMethod}
							className="border border-theme-border-moderate data-[error=true]:border-error-500"
						>
							<SelectValue placeholder="Select your Authentication Method" />
						</SelectTrigger>
						<SelectContent className="">
							<ScrollArea viewportClassName="max-h-[300px]">
								{methods.map((method) => (
									<SelectItem key={method.name} value={method.auth_method}>
										<div className="flex items-center gap-1">
											{type.logo_url && (
												<img
													alt={method.name}
													width={24}
													height={24}
													className="shrink-0 object-contain"
													src={type.logo_url}
												/>
											)}
											{method.name}
										</div>
									</SelectItem>
								))}
							</ScrollArea>
						</SelectContent>
					</Select>
					{errors.authMethod && (
						<p className="text-text-xs text-red-500">{errors.authMethod.message?.toString()}</p>
					)}
				</div>
			)}
		/>
	);
}
