import { useSearchParams } from "react-router-dom";
import { SurveyProvider } from "@/components/survey/SurveyContext";
import { ActivateWizard } from "./Wizard";

export default function ActivatePage() {
	const [searchParams] = useSearchParams();

	const id = searchParams.get("user");
	const username = searchParams.get("username");
	const token = searchParams.get("token");

	return (
		<div>
			<SurveyProvider>
				<ActivateWizard />
			</SurveyProvider>
		</div>
	);
}
