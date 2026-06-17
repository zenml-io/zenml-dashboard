import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useSurveyUserContext } from "./SurveyUserContext";

type Props = {
	fullName?: string;
	email?: string;
};

export function AccountDetailsStep({ fullName, email }: Props) {
	const { setSurveyStep } = useSurveyContext();
	const { setUser } = useSurveyUserContext();
	function handleDetailsSubmit({ fullName, getUpdates, email }: AccountDetailForm) {
		setUser((prev) => ({
			...prev,
			...(email ? { email } : { email: null }),
			full_name: fullName,
			email_opted_in: getUpdates
		}));
		setSurveyStep(2);
	}

	return (
		<AccountDetailsForm email={email} fullName={fullName} submitHandler={handleDetailsSubmit} />
	);
}
