import { useWizardContext } from "@/context/WizardContext";
import { useConnectorFullstackResources } from "@/data/service-connectors/resources-info";
import { useToast } from "@zenml-io/react-component-library";
import { produce } from "immer";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { FieldValues, SubmitHandler } from "react-hook-form";

export function useNewConnector() {
	const { setCurrentStep } = useWizardContext();
	const { toast } = useToast();
	const { setData, data } = useExistingInfraContext();
	const fullStackResources = useConnectorFullstackResources({
		onSuccess: async (data) => {
			setData((prev) =>
				produce(prev, (draft) => {
					draft.fullstackResources = data;
				})
			);
			setCurrentStep((prev) => prev + 1);
		},
		onError: (e) => {
			toast({
				status: "error",
				emphasis: "subtle",
				description: e.message,
				rounded: true
			});
		}
	});

	const handleFormSubmit: SubmitHandler<FieldValues> = ({ authMethod, stackName, ...rest }) => {
		Object.keys(rest).forEach((key) => {
			if (
				rest[key] === "" ||
				rest[key] === null ||
				rest[key] === undefined ||
				(rest[key] instanceof Array && rest[key].length === 0)
			) {
				delete rest[key];
			}
		});

		const newData = produce(data, (draft) => {
			draft.stackName = stackName;
			if (draft.connectorConfig) {
				draft.connectorConfig.auth_method = authMethod;
				draft.connectorConfig.configuration = { ...rest };
			}
		});

		setData(newData);

		if (!newData.connectorConfig) return;

		fullStackResources.mutate({
			payload: newData.connectorConfig
		});
	};

	return { handleFormSubmit };
}
