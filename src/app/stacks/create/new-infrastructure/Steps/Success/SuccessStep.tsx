import { useNewInfraFormContext } from "../../NewInfraFormContext";
import { WizardStepWrapper } from "../../Wizard";
import { SuccessList } from "./SuccessList";

export function SuccessStep() {
	const { setIsNextButtonDisabled, data, timestamp } = useNewInfraFormContext();
	setIsNextButtonDisabled(false);
	return (
		<WizardStepWrapper title="Your Stack">
			<div className="space-y-5">
				<p className="text-theme-text-secondary">
					Here you can review the created stack and stack components. Now you can start running
					pipelines using this new configuration.
				</p>
				<SuccessList
					provider={data.provider || "aws"}
					stackName={data.stackName || ""}
					timestamp={timestamp}
				/>
			</div>
		</WizardStepWrapper>
	);
}
