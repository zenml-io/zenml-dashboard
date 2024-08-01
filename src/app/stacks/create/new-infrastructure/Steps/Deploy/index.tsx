import { useEffect } from "react";
import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { WizardStepWrapper } from "../../Wizard";
import { DeployButtonPart } from "./ButtonStep";
import { ProvisioningStep } from "./ProvisioningStep";

export function DeployStep() {
	return (
		<WizardStepWrapper title="Deploy ZenML Stack">
			<DisplaySteps />
		</WizardStepWrapper>
	);
}

function DisplaySteps() {
	const { setIsNextButtonDisabled, isLoading } = useNewInfraFormContext();
	useEffect(() => {
		setIsNextButtonDisabled(true);
	}, []);
	if (isLoading) return <ProvisioningStep />;
	return <DeployButtonPart />;
}
