import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useActivationContext } from "./ActivationContext";

export function AccountDetailsStep() {
	const { setSurveyStep } = useSurvayContext();
	const { setNewUser, newUser } = useActivationContext();

	function handleDetailsSubmit({ fullName, getUpdates, workEmail, username }: AccountDetailForm) {
		setNewUser((prev) => ({
			...prev,
			email: workEmail,
			full_name: fullName,
			name: username,
			email_opted_in: getUpdates
		}));

		setSurveyStep(2);
	}

	return (
		<AccountDetailsForm
			email={newUser.email}
			username={newUser.name}
			fullName={newUser.full_name}
			submitHandler={handleDetailsSubmit}
		/>
	);
}
