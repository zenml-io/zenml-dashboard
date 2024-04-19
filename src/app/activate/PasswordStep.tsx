import { UpdatePasswordFormType } from "@/components/password/UpdatePasswordSchemas";
import { SetPasswordForm } from "@/components/survey/SetPassword";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useActivationContext } from "./ActivationContext";

export function SetPasswordStep() {
	const { setSurveyStep } = useSurvayContext();
	const { setNewUser } = useActivationContext();

	function handlePasswordSubmit({ newPassword }: UpdatePasswordFormType) {
		setNewUser((prev) => ({
			...prev,
			password: newPassword
		}));
		setSurveyStep(3);
	}

	return <SetPasswordForm submitHandler={handlePasswordSubmit} />;
}
