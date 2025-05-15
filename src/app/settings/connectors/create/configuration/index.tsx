import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import * as Wizard from "@/components/wizard/Wizard";
import { useWizardContext } from "@/context/WizardContext";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useCreateServiceConnector } from "@/data/service-connectors/create-service-connector";
import { useCurrentUser } from "@/data/users/current-user-query";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { CancelButton, NextButton, PreviousButton } from "../common/footer-buttons";
import { useRegisterConnectorContext } from "../create-context";
import { AuthMethodSection } from "./auth-method-section";
import { ConfigSection } from "./config-section";
import { constructPayload } from "./helper";
import { useNameSchema } from "./name-schema";
import { NameSection } from "./name-section";
import { ResourceTypeSection } from "./resource-type-section";
import { ConnectorConfigForm } from "./schema";

export function ConnectorConfigurationStep() {
	const userQuery = useCurrentUser();
	const { connectorType, setCreatedConnector } = useRegisterConnectorContext();
	const { goToNextStep } = useWizardContext();
	const baseSchema = useNameSchema("");
	const [schema, setSchema] = useState<ZodSchema>(baseSchema);
	const { toast } = useToast();
	const invalidationKey = serviceConnectorQueries.connectors;
	const queryClient = useQueryClient();
	const createConnector = useCreateServiceConnector({
		onSuccess: (d) => {
			queryClient.invalidateQueries({ queryKey: invalidationKey });
			setCreatedConnector(d);
			goToNextStep();
		},
		onError: (error) => {
			toast({
				status: "error",
				emphasis: "subtle",
				icon: <AlertCircle width={24} height={24} className="shrink-0 fill-error-700" />,
				description: error.message,
				rounded: true
			});
		}
	});
	const [configDefaultValues, setConfigDefaultValues] = useState<Record<string, unknown>>({});

	const refinedSchema = schema.refine(
		(d) => {
			if (d.isValid === true || d.skipValidation === true) return true;
			return false;
		},
		{
			message: "Either verify the connector or register without validation",
			path: ["skipValidation"]
		}
	);

	const form = useForm<ConnectorConfigForm>({
		resolver: zodResolver(refinedSchema),
		shouldUnregister: true,
		mode: "onChange",
		defaultValues: {
			name: "",
			description: "",
			authMethod: "",
			isValid: null,
			resourceType: "all",
			skipValidation: false,
			...configDefaultValues
		}
	});

	if (userQuery.isPending) return <Skeleton className="h-[500px] w-full" />;

	if (userQuery.isError) return <p>Error fetching user</p>;

	const handleCreateConnector = (formData: ConnectorConfigForm) => {
		const payload = constructPayload({
			...formData,
			connectorType,
			user: userQuery.data.id
		});

		createConnector.mutate({
			body: payload
		});
	};

	return (
		<Wizard.Wrapper>
			<FormProvider {...form}>
				<DevTool control={form.control} />
				<Wizard.Header>Configure your Service Connector</Wizard.Header>
				<form onSubmit={form.handleSubmit(handleCreateConnector)}>
					<Wizard.Body>
						<div className="divide-y divide-theme-border-moderate *:py-5 first:*:pt-0 last:*:pb-0">
							<NameSection />
							<ResourceTypeSection />
							<AuthMethodSection
								setConfigDefaultValues={setConfigDefaultValues}
								setSchema={setSchema}
							/>
							<ConfigSection user={userQuery.data.id} />
						</div>
					</Wizard.Body>
					<Wizard.Footer>
						<CancelButton />
						<PreviousButton />
						<NextButton
							isPending={form.formState.isSubmitting || createConnector.isPending}
							disabled={form.formState.isSubmitting || createConnector.isPending}
						/>
					</Wizard.Footer>
				</form>
			</FormProvider>
		</Wizard.Wrapper>
	);
}
