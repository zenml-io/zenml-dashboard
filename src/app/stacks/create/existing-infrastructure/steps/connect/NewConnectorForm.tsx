import { useWizardContext } from "@/context/WizardContext";
import { produce } from "immer";
import { AuthenticationMethod } from "./AuthenticationMethod";
import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import { useToast } from "@zenml-io/react-component-library";
import { useExistingInfraContext } from "../../ExistingInfraContext";
import { useConnectorFullstackResources } from "@/data/service-connectors/resources-info";
import { StackName } from "../../../components/StackName";
import { ConnectorConfig } from "./Configuration";

export function NewConnector() {
	const { data, setData } = useExistingInfraContext();
	const { setCurrentStep } = useWizardContext();
	const { toast } = useToast();
	const { handleSubmit } = useFormContext();

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

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} id="connect-form">
			<AuthenticationMethod />
			<StackName />
			<ConnectorConfig />
		</form>
	);
}
