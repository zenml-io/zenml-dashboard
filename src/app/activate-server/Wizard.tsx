import StepDisplay from "@/components/survey/StepDisplay";
import { SuccessStep } from "@/components/survey/SuccessStep";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { SetPasswordStep } from "./PasswordStep";
import { ServerActivationProvider } from "./ServerActivationContext";
import { SetServerNameStep } from "./ServerNameStep";
import { useState } from "react";

export function ServerActivationWizard() {
	const { surveyStep } = useSurveyContext();
	const [username, setUsername] = useState("");

	return (
		<>
			<ServerActivationProvider>
				<StepDisplay stepAmount={2} />
				{surveyStep === 1 && <SetPasswordStep />}
				{surveyStep === 2 && <SetServerNameStep setUsername={setUsername} />}
				{surveyStep === 3 && (
					<SuccessStep subHeader="Your created your ZenML account" username={username} />
				)}
			</ServerActivationProvider>
		</>
	);
}
