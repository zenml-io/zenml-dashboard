import { SurveyProvider } from "@/components/survey/SurveyContext";
import { ServerActivationWizard } from "./Wizard";

export default function ServerActivationPage() {
	return (
		<SurveyProvider>
			<ServerActivationWizard />
		</SurveyProvider>
	);
}
