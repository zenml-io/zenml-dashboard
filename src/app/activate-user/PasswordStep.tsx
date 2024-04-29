import { UpdatePasswordFormType } from "@/components/password/UpdatePasswordSchemas";
import { SetPasswordForm } from "@/components/survey/SetPassword";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useActivationContext } from "./ActivationContext";

export function SetPasswordStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setNewUser } = useActivationContext();

	function handlePasswordSubmit({ newPassword }: UpdatePasswordFormType) {
		setNewUser((prev) => ({
			...prev,
			password: newPassword
		}));
		setSurveyStep((prev) => prev + 1);
	}

	return <SetPasswordForm submitHandler={handlePasswordSubmit} />;
}
