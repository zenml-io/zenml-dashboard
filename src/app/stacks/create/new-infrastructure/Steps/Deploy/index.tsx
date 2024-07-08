import { useEffect } from "react";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { useNewInfraWizardContext } from "../../NewInfraWizardContext";
import { WizardStepWrapper } from "../../Wizard";
import { ProvisioningStep } from "./ProvisioningStep";
import { DeployButtonPart } from "./ButtonStep";

export function DeployStep() {
	return (
		<WizardStepWrapper title="Deploy ZenML Stack">
			<DisplaySteps />
		</WizardStepWrapper>
	);
}

function DisplaySteps() {
	const { isLoading } = useNewInfraWizardContext();
	const { setIsNextButtonDisabled } = useNewInfraFormContext();
	useEffect(() => {
		setIsNextButtonDisabled(true);
	}, []);
	if (isLoading) return <ProvisioningStep />;
	return <DeployButtonPart />;
}
