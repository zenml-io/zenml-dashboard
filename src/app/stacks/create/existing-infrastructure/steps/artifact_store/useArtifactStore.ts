import { useWizardContext } from "@/context/WizardContext";
import { ComponentResourceInfo } from "@/types/service-connectors";
import { produce } from "immer";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { ArtifactStoreForm } from "./schema";

export function useArtifactStore() {
	const { data, setData } = useExistingInfraContext();
	const { setCurrentStep } = useWizardContext();

	if (!data.fullstackResources) {
		setCurrentStep(2);
		return { handleFormSubmit: () => {}, flattenedInstances: [] };
	}

	const stores = (data.fullstackResources.components_resources_info as ComponentResourceInfo)
		.artifact_store;

	const flattenedInstances = stores.flatMap((store) =>
		store.accessible_by_service_connector.map((connector) => ({
			...store,
			value: connector
		}))
	);

	function handleFormSubmit({ flavor, resourceId }: ArtifactStoreForm) {
		const store = stores.find((store) => store.flavor === flavor);
		if (!store) return;

		setData((prev) =>
			produce(prev, (draft) => {
				draft.artifactStoreConfig = {
					flavor,
					configuration: Object.fromEntries(
						Object.keys(store.required_configuration || {}).map((key) => [key, resourceId])
					),
					service_connector_resource_id: resourceId
				};
			})
		);
		setCurrentStep((prev) => prev + 1);
	}

	return { handleFormSubmit, flattenedInstances };
}
