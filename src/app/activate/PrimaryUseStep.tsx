import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { useActivationContext } from "./ActivationContext";
import { UserMetadata } from "@/types/user";

export function PrimaryUseStep() {
	const { setSurveyStep } = useSurvayContext();
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
		setSurveyStep(4);
	}

	return <PrimaryUseForm submitHandler={handlePrimaryUseSubmit} />;
}
