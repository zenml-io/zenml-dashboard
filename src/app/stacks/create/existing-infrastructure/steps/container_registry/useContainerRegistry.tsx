import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useWizardContext } from "@/context/WizardContext";
import { stackQueries } from "@/data/stacks";
import { useCreateFullstack } from "@/data/stacks/full-stack-create";
import { ComponentResourceInfo } from "@/types/service-connectors";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { produce } from "immer";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { ContainerRegistryFormType } from "./schema";

export function useContainerRegistries() {
	const { data, setData } = useExistingInfraContext();
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const { setCurrentStep } = useWizardContext();
	const { mutate } = useCreateFullstack({
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		},
		onSuccess: async (res) => {
			setData((prev) =>
				produce(prev, (draft) => {
					draft.createdStackId = res.id;
				})
			);
			setCurrentStep((prev) => prev + 1);
			queryClient.invalidateQueries({ queryKey: stackQueries.all });
		}
	});

	if (!data.fullstackResources) {
		setCurrentStep(2);
		return { handleFormSubmit: () => {}, flattenedInstances: [] };
	}

	const registries = (data.fullstackResources.components_resources_info as ComponentResourceInfo)
		.container_registry;

	const flattenedInstances = registries.flatMap((registry) =>
		registry.accessible_by_service_connector.map((instance) => ({
			...registry,
			value: instance
		}))
	);

	function handleFormSubmit({ flavor, resourceId }: ContainerRegistryFormType) {
		const registry = registries.find((registry) => registry.flavor === flavor);
		if (!registry) return;

		const updatedData = produce(data, (draft) => {
			draft.registryConfig = {
				flavor,
				configuration: Object.fromEntries(
					Object.keys(registry.required_configuration || {}).map((key) => [key, resourceId])
				),
				service_connector_resource_id: resourceId
			};
		});
		setData(updatedData);
		mutate({
			workspaceId: "default",
			payload: {
				name: updatedData.stackName || Math.random().toString(36).substring(7),
				service_connectors: updatedData.connectorConfig ? [updatedData.connectorConfig] : [],
				components: {
					orchestrator: { ...updatedData.orchestratorConfig, service_connector_index: 0 },
					artifact_store: { ...updatedData.artifactStoreConfig, service_connector_index: 0 },
					container_registry: { ...updatedData.registryConfig, service_connector_index: 0 }
				}
			}
		});
	}

	return { handleFormSubmit, flattenedInstances };
}
