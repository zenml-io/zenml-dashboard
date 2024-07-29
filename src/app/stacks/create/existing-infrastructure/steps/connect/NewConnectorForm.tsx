import { useFormContext } from "react-hook-form";
import { StackName } from "../../../components/StackName";
import { AuthenticationMethod } from "./AuthenticationMethod";
import { ConnectorConfig } from "./Configuration";
import { useNewConnector } from "./useNewConnector";

export function NewConnector() {
	const { handleSubmit } = useFormContext();
	const { handleFormSubmit } = useNewConnector();

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} id="connect-form">
			<AuthenticationMethod />
			<StackName />
			<ConnectorConfig />
		</form>
	);
}
