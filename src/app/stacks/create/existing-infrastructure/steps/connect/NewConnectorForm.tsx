import { useFormContext } from "react-hook-form";
import { StackName } from "../../../components/StackName";
import { AuthenticationMethod } from "./AuthenticationMethod";
import { ConnectorConfig } from "./Configuration";
import { LoadingModal } from "./LoadingModal";
import { useNewConnector } from "./useNewConnector";

export function NewConnector() {
	const {
		handleSubmit,
		formState: { isSubmitting }
	} = useFormContext();
	const { handleFormSubmit, fullStackResources, loadingComponents } = useNewConnector();

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} id="connect-form">
			<LoadingModal
				loadingComponents={loadingComponents}
				open={isSubmitting || fullStackResources.isPending}
			/>
			<AuthenticationMethod />
			<StackName />
			<ConnectorConfig />
		</form>
	);
}
