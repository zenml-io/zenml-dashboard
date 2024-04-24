import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { useActivationContext } from "./ActivationContext";
import { UserMetadata } from "@/types/user";

export function PrimaryUseStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setNewUser } = useActivationContext();

	function handlePrimaryUseSubmit({ amountProductionModels, primaryUse }: PrimaryUseFormType) {
		const newMetadata: UserMetadata = {
			primary_use: primaryUse,
			models_production: amountProductionModels
		};
		setNewUser((prev) => ({
			...prev,
			metadata: { ...prev.metadata, ...newMetadata }
		}));
		setSurveyStep((prev) => prev + 1);
	}

	return <PrimaryUseForm submitHandler={handlePrimaryUseSubmit} />;
}
