import { useWizardContext } from "@/context/WizardContext";
import { ConfigurationStep } from "./steps/configuration";
// import { DeploymentStep } from "./steps/deploy";
import { ProviderStep } from "./steps/provider";
// import { SuccessStep } from "./steps/success";

export function TerraformWizard() {
	const { currentStep } = useWizardContext();

	if (currentStep === 1) return <ProviderStep />;
	if (currentStep === 2) return <ConfigurationStep />;
	// if (currentStep === 3) return <DeploymentStep />;
	// if (currentStep === 4) return <SuccessStep />;
}
