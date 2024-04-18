import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { User, UserMetadata } from "@/types/user";

type Props = {
	user: User;
};

export function PrimaryUseStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: () => {
			setSurveyStep(3);
		}
	});
	function handlePrimaryUseSubmit({ amountProductionModels, primaryUse }: PrimaryUseFormType) {
		const metadata: UserMetadata = {
			models_production: amountProductionModels,
			primary_use: primaryUse
		};
		mutate({ user_metadata: metadata });
	}

	return <PrimaryUseForm user={user} submitHandler={handlePrimaryUseSubmit} />;
}
