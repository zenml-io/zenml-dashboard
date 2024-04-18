import StepDisplay from "@/components/survey/StepDisplay";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { SetPasswordStep } from "./PasswordStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { AwarenessStep } from "./AwarenessStep";

export function ActivateWizard() {
	const { surveyStep } = useSurvayContext();

	return (
		<>
			<StepDisplay stepAmount={4} />
			{surveyStep === 1 && <AccountDetailsStep />}
			{surveyStep === 2 && <SetPasswordStep />}
			{surveyStep === 3 && <PrimaryUseStep />}
			{surveyStep === 4 && <AwarenessStep />}
		</>
	);
}
