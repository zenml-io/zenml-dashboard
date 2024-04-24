import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { User } from "@/types/user";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useSurveyUserContext } from "./SurveyUserContext";

type Props = {
	user: User;
};

export function AccountDetailsStep({ user }: Props) {
	const { setSurveyStep } = useSurveyContext();
	const { setUser } = useSurveyUserContext();
	function handleDetailsSubmit({ fullName, getUpdates, email }: AccountDetailForm) {
		//@ts-expect-error null is the initial value it needs to be set to
		setUser((prev) => ({
			...prev,
			...(email && email !== "" ? { email } : { email: null }),
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
