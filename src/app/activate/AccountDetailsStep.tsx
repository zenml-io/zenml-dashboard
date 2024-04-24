import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useActivationContext } from "./ActivationContext";

export function AccountDetailsStep() {
	const { setSurveyStep } = useSurveyContext();
	const { setNewUser, newUser } = useActivationContext();

	function handleDetailsSubmit({ fullName, getUpdates, email }: AccountDetailForm) {
		//@ts-expect-error null is the initial value it needs to be set to
		setNewUser((prev) => ({
			...prev,
			...(email ? { email } : { email: null }),
			full_name: fullName,
			email_opted_in: getUpdates
		}));

		setSurveyStep((prev) => prev + 1);
	}

	return (
		<AccountDetailsForm
			email={newUser.email}
			fullName={newUser.full_name}
			submitHandler={handleDetailsSubmit}
		/>
	);
}
