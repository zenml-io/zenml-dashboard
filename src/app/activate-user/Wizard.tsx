import StepDisplay from "@/components/survey/StepDisplay";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { SetPasswordStep } from "./PasswordStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { AwarenessStep } from "./AwarenessStep";
import { ActivationProvider } from "./ActivationContext";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "@/components/EmptyState";
import { SuccessStep } from "@/components/survey/SuccessStep";

export function ActivateWizard() {
	const { surveyStep } = useSurveyContext();
	const [searchParams] = useSearchParams();

	const id = searchParams.get("user");
	const token = searchParams.get("token");

	if (!id || !token) {
		return (
			<EmptyState>
				<p>Invalid activation link.</p>
			</EmptyState>
		);
	}

	return (
		<>
			<ActivationProvider initialUser={{ activation_token: token }}>
				<StepDisplay stepAmount={4} />
				{surveyStep === 1 && <AccountDetailsStep />}
				{surveyStep === 2 && <SetPasswordStep />}
				{surveyStep === 3 && <PrimaryUseStep />}
				{surveyStep === 4 && <AwarenessStep userId={id} />}
				{surveyStep === 5 && (
					<SuccessStep subHeader="Your created your ZenML account" username="Sheesh" />
				)}
			</ActivationProvider>
		</>
	);
}
