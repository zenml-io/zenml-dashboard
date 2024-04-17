import { User } from "@/types/user";
import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { Dispatch, SetStateAction } from "react";

type Props = {
	user: User;
	updateStep: Dispatch<SetStateAction<number>>;
};

export function AccountDetailsStep({ user, updateStep }: Props) {
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: () => {
			updateStep(2);
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
