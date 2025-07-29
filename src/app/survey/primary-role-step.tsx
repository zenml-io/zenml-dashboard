import { PrimaryRoleForm } from "@/components/survey/primary-role";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { PrimaryRoleFormType } from "@/components/survey/form-schemas";
import { User, UserMetadata } from "@/types/user";
import { useSurveyUserContext } from "./SurveyUserContext";

type Props = {
	user: User;
};

export function PrimaryRoleStep({ user }: Props) {
	const { setSurveyStep } = useSurveyContext();
	const { setUser } = useSurveyUserContext();

	function handlePrimaryRoleSubmit({ primaryRole, otherVal }: PrimaryRoleFormType) {
		const primary_role = primaryRole === "other" ? otherVal : primaryRole;
		const metadata: UserMetadata = {
			primary_role
		};
		setUser((prev) => ({
			...prev,
			user_metadata: { ...prev.user_metadata, ...metadata }
		}));

		setSurveyStep(3);
	}

	return <PrimaryRoleForm user={user} submitHandler={handlePrimaryRoleSubmit} />;
}
