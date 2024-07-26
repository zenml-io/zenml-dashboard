import { SchemaProvider } from "@/context/SchemaContext";
import { useWizardContext } from "@/context/WizardContext";
import { ArtifactStoreStep } from "./steps/artifact_store";
import { ConnectCloudStep } from "./steps/connect";
import { newConnectorBaseSchema } from "./steps/connect/schema";
import { ProviderStep } from "./steps/provider";

export function ExistingInfraWizard() {
	const { currentStep } = useWizardContext();
	if (currentStep === 1) return <ProviderStep />;
	if (currentStep === 2)
		return (
			<SchemaProvider initialSchema={newConnectorBaseSchema}>
				<ConnectCloudStep />
			</SchemaProvider>
		);
	if (currentStep === 3) return <ArtifactStoreStep />;
}
