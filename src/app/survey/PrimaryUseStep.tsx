import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { User, UserMetadata } from "@/types/user";
import { Dispatch, SetStateAction } from "react";

type Props = {
	user: User;
	updateStep: Dispatch<SetStateAction<number>>;
};

export function PrimaryUseStep({ user, updateStep }: Props) {
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess() {
			updateStep(3);
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
