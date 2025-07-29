import { PrimaryRoleForm } from "@/components/survey/primary-role";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { PrimaryRoleFormType } from "@/components/survey/form-schemas";
import { useActivationContext } from "./ActivationContext";
import { UserMetadata } from "@/types/user";

export function PrimaryRoleStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setNewUser } = useActivationContext();

	function handlePrimaryUseSubmit({ primaryRole, otherVal }: PrimaryRoleFormType) {
		const newMetadata: UserMetadata = {
			primary_role: primaryRole === "other" ? otherVal : primaryRole
		};
		setNewUser((prev) => ({
			...prev,
			user_metadata: { ...prev.user_metadata, ...newMetadata }
		}));
		setSurveyStep((prev) => prev + 1);
	}

	return <PrimaryRoleForm submitHandler={handlePrimaryUseSubmit} />;
}
