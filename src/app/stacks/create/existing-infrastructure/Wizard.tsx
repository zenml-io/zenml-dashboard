import { useWizardContext } from "@/context/WizardContext";
import { ProviderStep } from "./steps/provider";

export function ExistingInfraWizard() {
	const { currentStep } = useWizardContext();
	if (currentStep === 1) return <ProviderStep />;
}
