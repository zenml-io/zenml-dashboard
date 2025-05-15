import { useWizardContext } from "@/context/WizardContext";
import { RegisterConnectorProvider } from "./create-context";
import { ConnectorTypeStep } from "./connector-type";
import { ConnectorConfigurationStep } from "./configuration";
import { ConnectorSuccessStep } from "./success";

export function ConnectorRegistrationWizard() {
	return (
		<RegisterConnectorProvider>
			<WizardContent />
		</RegisterConnectorProvider>
	);
}

function WizardContent() {
	const { currentStep } = useWizardContext();

	if (currentStep === 0) return <ConnectorTypeStep />;
	if (currentStep === 1) return <ConnectorConfigurationStep />;
	if (currentStep === 2) return <ConnectorSuccessStep />;
}
