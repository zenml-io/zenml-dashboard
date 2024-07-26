import { useWizardContext } from "@/context/WizardContext";
import { produce } from "immer";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { ContainerRegistryFormType } from "./schema";
import { useQueryClient } from "@tanstack/react-query";
import { ComponentResourceInfo } from "@/types/service-connectors";
import { useCreateFullstack } from "@/data/stacks/full-stack-create";
import { stackQueries } from "@/data/stacks";

export function useContainerRegistries() {
	const { data, setData } = useExistingInfraContext();
	const queryClient = useQueryClient();

	const { setCurrentStep } = useWizardContext();
	const { mutate } = useCreateFullstack({
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
					orchestrator: updatedData.orchestratorConfig,
					artifact_store: updatedData.artifactStoreConfig,
					container_registry: updatedData.registryConfig
				}
			}
		});
	}

	return { handleFormSubmit, flattenedInstances };
}
