import { useWizardContext } from "@/context/WizardContext";
import { ComponentResourceInfo } from "@/types/service-connectors";
import { produce } from "immer";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { OrchestratorForm } from "./schema";

export function useOrchestrator() {
	const { data, setData } = useExistingInfraContext();
	const { setCurrentStep } = useWizardContext();

	if (!data.fullstackResources) {
		setCurrentStep(2);
		return { orchestrators: [], handleFormSubmit: () => {} };
	}

	const orchestrators =
		(data.fullstackResources.components_resources_info as ComponentResourceInfo | undefined)
			?.orchestrator || [];

	function handleFormSubmit({ flavor, resourceId, ...rest }: OrchestratorForm) {
		const orchestrator = orchestrators.find((orchestrator) => orchestrator.flavor === flavor);
		if (!orchestrator) return;
		setData((prev) => {
			const config = orchestrator?.use_resource_value_as_fixed_config
				? Object.fromEntries(
						Object.keys(orchestrator.required_configuration || {}).map((key) => [key, resourceId])
					)
				: { ...rest };

			return produce(prev, (draft) => {
				draft.orchestratorConfig = {
					flavor,
					configuration: config,
					service_connector_resource_id: resourceId
				};
			});
		});
		setCurrentStep((prev) => prev + 1);
	}

	return { orchestrators, handleFormSubmit };
}
