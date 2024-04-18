import { UpdatePasswordFormType } from "@/components/password/UpdatePasswordSchemas";
import { SetPasswordForm } from "@/components/survey/SetPassword";
import { useSurvayContext } from "@/components/survey/SurveyContext";

export function SetPasswordStep() {
	const { setSurveyStep } = useSurvayContext();

	function handlePasswordSubmit({ oldPassword, newPassword }: UpdatePasswordFormType) {
		console.log(oldPassword, newPassword);
		setSurveyStep(3);
	}

	return <SetPasswordForm submitHandler={handlePasswordSubmit} />;
}
