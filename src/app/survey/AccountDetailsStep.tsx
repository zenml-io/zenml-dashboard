import { User } from "@/types/user";
import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { useSurvayContext } from "@/components/survey/SurveyContext";

type Props = {
	user: User;
};

export function AccountDetailsStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: () => {
			setSurveyStep(2);
		}
	});

	function handleDetailsSubmit({ fullName, getUpdates, workEmail, username }: AccountDetailForm) {
		mutate({
			email: workEmail,
			full_name: fullName,
			name: username,
			user_metadata: { get_updates: getUpdates }
		});
	}

	return <AccountDetailsForm user={user} submitHandler={handleDetailsSubmit} />;
}
