import { SurveyProvider } from "@/components/survey/SurveyContext";
import { ActivateWizard } from "./Wizard";

export default function ActivatePage() {
	return (
		<div>
			<SurveyProvider>
				<ActivateWizard />
			</SurveyProvider>
		</div>
	);
}
