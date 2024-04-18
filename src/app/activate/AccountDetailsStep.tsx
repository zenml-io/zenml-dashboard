import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { useSurvayContext } from "@/components/survey/SurveyContext";

export function AccountDetailsStep() {
	const { setSurveyStep } = useSurvayContext();
	return (
		<AccountDetailsForm
			isDefaultUser
			submitHandler={(data) => {
				console.log(data);
				setSurveyStep(2);
			}}
		/>
	);
}
