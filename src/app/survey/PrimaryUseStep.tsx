import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { User, UserMetadata } from "@/types/user";
import { useSurveyUserContext } from "./SurveyUserContext";

type Props = {
	user: User;
};

export function PrimaryUseStep({ user }: Props) {
	const { setSurveyStep } = useSurveyContext();
	const { setUser } = useSurveyUserContext();

	function handlePrimaryUseSubmit({ amountProductionModels, primaryUse }: PrimaryUseFormType) {
		const metadata: UserMetadata = {
			models_production: amountProductionModels,
			primary_use: primaryUse
		};
		setUser((prev) => ({
			...prev,
			metadata: { ...prev.metadata, ...metadata }
		}));
		setSurveyStep(3);
	}

	return <PrimaryUseForm user={user} submitHandler={handlePrimaryUseSubmit} />;
}
