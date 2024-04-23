import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { User } from "@/types/user";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useSurveyUserContext } from "./SurveyUserContext";

type Props = {
	user: User;
};

export function AccountDetailsStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { setUser } = useSurveyUserContext();
	function handleDetailsSubmit({ fullName, getUpdates, email }: AccountDetailForm) {
		setUser((prev) => ({
			...prev,
			email,
			full_name: fullName,
			email_opted_in: getUpdates
		}));
		setSurveyStep(2);
	}

	return (
		<AccountDetailsForm
			email={user.metadata?.email}
			fullName={user.body?.full_name}
			submitHandler={handleDetailsSubmit}
		/>
	);
}
