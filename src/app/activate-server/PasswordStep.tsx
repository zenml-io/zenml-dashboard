import { SetPasswordForm } from "@/components/survey/SetPassword";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useServerActivationContext } from "./ServerActivationContext";
import { SetPasswordStepType } from "@/components/survey/form-schemas";

export function SetPasswordStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setServerSettings } = useServerActivationContext();

	function handlePasswordSubmit({ newPassword, username }: SetPasswordStepType) {
		setServerSettings((prev) => ({
			...prev,
			admin_password: newPassword,
			admin_username: username
		}));
		setSurveyStep((prev) => prev + 1);
	}

	return (
		<SetPasswordForm
			displayUsername
			headline="Create your admin user and password"
			subHeadine="Select a username and password for your admin account"
			submitHandler={handlePasswordSubmit}
		/>
	);
}
