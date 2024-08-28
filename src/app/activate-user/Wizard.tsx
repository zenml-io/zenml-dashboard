import { EmptyState } from "@/components/EmptyState";
import { SlackStep } from "@/components/survey/SlackStep";
import StepDisplay from "@/components/survey/StepDisplay";
import { SuccessStep } from "@/components/survey/SuccessStep";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AccountDetailsStep } from "./AccountDetailsStep";
import { ActivationProvider } from "./ActivationContext";
import { InfraStep } from "./InfrastructureStep";
import { SetPasswordStep } from "./PasswordStep";
import { PrimaryUseStep } from "./PrimaryUseStep";
import { UsageReasonStep } from "./UsageReasonStep";

export function ActivateWizard() {
	const { surveyStep } = useSurveyContext();
	const [searchParams] = useSearchParams();
	const [username, setUsername] = useState("");

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
				<StepDisplay stepAmount={6} />
				{surveyStep === 1 && <AccountDetailsStep />}
				{surveyStep === 2 && <SetPasswordStep />}
				{surveyStep === 3 && <PrimaryUseStep />}
				{surveyStep === 4 && <UsageReasonStep />}
				{surveyStep === 5 && <InfraStep setUsername={setUsername} userId={id} />}
				{surveyStep === 6 && <SlackStep />}
				{surveyStep === 7 && (
					<SuccessStep subHeader="Your created your ZenML account" username={username} />
				)}
			</ActivationProvider>
		</>
	);
}
