import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";

export function PrimaryUseStep() {
	const { setSurveyStep } = useSurvayContext();

	function handlePrimaryUseSubmit(data: PrimaryUseFormType) {
		console.log(data);

		setSurveyStep(4);
	}

	return <PrimaryUseForm submitHandler={handlePrimaryUseSubmit} />;
}
