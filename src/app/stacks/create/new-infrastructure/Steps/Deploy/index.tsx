import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { WizardStepWrapper } from "../../Wizard";
import { AWSDeployStep } from "./AWS";

export function DeployStep() {
	const { data } = useNewInfraFormContext();
	return (
		<WizardStepWrapper title="Deploy ZenML Stack">
			{data.provider === "aws" && <AWSDeployStep />}
		</WizardStepWrapper>
	);
}
