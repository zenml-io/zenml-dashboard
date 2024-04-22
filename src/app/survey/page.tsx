import { SurveyProvider } from "@/components/survey/SurveyContext";
import { SurveyWizard } from "./Wizard";

export default function SurveyPage() {
	return (
		<div>
			<SurveyProvider>
				<SurveyWizard />
			</SurveyProvider>
		</div>
	);
}
