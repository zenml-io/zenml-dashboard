"use client";

import { getisOptional, getZodSchemaFromConfig } from "@/lib/forms";
import { Flavor } from "@/types/flavors";
import { JSONSchema } from "@/types/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollArea, useToast } from "@zenml-io/react-component-library/components/client";
import { Input, Skeleton } from "@zenml-io/react-component-library/components/server";
import { FunctionComponent, ReactNode } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { InfoTile } from "./info-tile";
import { componentBaseSchema } from "./schema";
import { flavorQueries } from "@/data/flavors";
import { useCurrentUser } from "@/data/users/current-user-query";
import { workspaceQueries } from "@/data/workspaces";
import { componentQueries } from "@/data/components";
import { useCreateComponent } from "@/data/components/create-component";
import { generateDefaultValues } from "../../form/helper";
import { DynamicField } from "../../form/form";
import { ConnectorSection } from "./connector-section";

type Props = {
	formId: string;
	flavorId: string;
	successHandler?: (id: string) => void;
	FooterComponent: FunctionComponent<FooterProps>;
};

export function ComponentConfigurationForm({
	flavorId,
	formId,
	successHandler,
	FooterComponent
}: Props) {
	const flavor = useQuery(flavorQueries.flavorDetail(flavorId));
	const user = useCurrentUser();
	const workspace = useQuery(workspaceQueries.workspaceDetail("default"));
	if (flavor.isPending || user.isPending || workspace.isPending)
		return (
			<div className="px-8 py-5">
				<Skeleton className="h-[250px] w-full" />
			</div>
		);
	if (flavor.isError || user.isError || workspace.isError)
		return <p className="px-8 py-5">Failed to fetch flavor</p>;

	return (
		<ComponentConfigurationFormBody
			infoTile={
				<InfoTile
					name={flavor.data.name}
					sdkDocsUrl={flavor.data.metadata?.sdk_docs_url ?? undefined}
					logoUrl={flavor.data.body?.logo_url ?? undefined}
				/>
			}
			FooterComponent={FooterComponent}
			successHandler={successHandler}
			workspaceId={workspace.data.id}
			flavor={flavor.data}
			userId={user.data.id}
			formId={formId}
			schema={flavor.data.metadata?.config_schema as JSONSchema}
		/>
	);
}

type FormProps = {
	schema: JSONSchema;
	formId: string;
	flavor: Flavor;
	userId: string;
	workspaceId: string;
	successHandler?: (id: string) => void;
	infoTile: ReactNode;
	FooterComponent: FunctionComponent<FooterProps>;
};

function ComponentConfigurationFormBody({
	formId,
	schema,
	flavor,
	userId,
	workspaceId,
	successHandler,
	infoTile,
	FooterComponent
}: FormProps) {
	const { toast } = useToast();
	const componentKey = componentQueries.all;
	const queryClient = useQueryClient();
	const createComponent = useCreateComponent({
		onSuccess: ({ id }) => {
			queryClient.invalidateQueries({ queryKey: componentKey });
			successHandler?.(id);
		},
		onError: (e) => {
			toast({
				emphasis: "subtle",
				status: "error",
				rounded: true,
				description: e.message
			});
		}
	});

	const properties = schema.properties || {};
	const required = schema.required || [];
	const defs = schema.$defs;

	function submitHandler({ componentName, ...rest }: FieldValues) {
		console.log(rest);
		Object.keys(rest).forEach((key) => {
			if (
				rest[key] === "" ||
				rest[key] === null ||
				rest[key] === undefined ||
				(Array.isArray(rest[key]) && rest[key].length === 0) ||
				(typeof rest[key] === "object" &&
					!Array.isArray(rest[key]) &&
					Object.keys(rest[key]).length === 0)
			) {
				delete rest[key];
			}
		});

		if (!flavor.body) return;

		const { connector, ...config } = rest;

		createComponent.mutate({
			workspaceId: workspaceId,
			payload: {
				name: componentName,
				configuration: config,
				flavor: flavor.name,
				type: flavor.body.type,
				user: userId,
				connector: connector || null,
				workspace: workspaceId
			}
		});
	}

	const zodConfig = componentBaseSchema.merge(getZodSchemaFromConfig(schema));

	const defaultConfigValues = generateDefaultValues(schema);

	const form = useForm({
		resolver: zodResolver(zodConfig),
		defaultValues: { componentName: "", connector: "", ...defaultConfigValues }
	});

	const { handleSubmit } = form;

	const sortedProperties = Object.entries(properties).sort(([key1], [key2]) => {
		if (required.includes(key1) && !required.includes(key2)) return -1;
		if (!required.includes(key1) && required.includes(key2)) return 1;
		return 0;
	});

	return (
		<FormProvider {...form}>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					return handleSubmit(submitHandler)(e);
				}}
				id={formId}
			>
				<ScrollArea viewportClassName="max-h-[70vh]">
					<div className="space-y-4 p-8">
						<div className="space-y-0.5">
							<label className="text-text-lg font-semibold">Component Name</label>
							<Input
								{...form.register("componentName")}
								data-error={form.formState.errors.componentName ? "true" : "false"}
								className="w-full data-[error=true]:border-error-500"
								inputSize="lg"
							/>
							{form.formState.errors.componentName && (
								<p className="text-text-sm text-error-500">
									{form.formState.errors.componentName.message?.toString()}
								</p>
							)}
						</div>

						<div className="flex flex-col-reverse gap-5 xl:flex-row">
							<div className="flex-1 space-y-5">
								{flavor.metadata?.connector_resource_type ? (
									<ConnectorSection
										connectorResourceType={flavor.metadata.connector_resource_type}
									/>
								) : null}
								<p className="text-text-lg font-semibold">Attributes</p>
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
							<div className="w-full xl:w-1/3">{infoTile}</div>
						</div>
					</div>
				</ScrollArea>
				<FooterComponent formId={formId} isPending={createComponent.isPending} />
			</form>
		</FormProvider>
	);
}

type FooterProps = {
	formId: string;
	isPending: boolean;
};
