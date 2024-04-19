import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { UpdatePasswordFormType } from "@/components/password/UpdatePasswordSchemas";
import { SetPasswordForm } from "@/components/survey/SetPassword";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { getIsDefaultUser } from "@/lib/user";
import { User } from "@/types/user";
import { useToast } from "@zenml-io/react-component-library";

type Props = {
	user: User;
};
export function SetPasswordStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { toast } = useToast();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: () => {
			setSurveyStep(3);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <AlertCircle className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function handlePasswordSubmit({ oldPassword, newPassword }: UpdatePasswordFormType) {
		mutate({
			password: newPassword,
			old_password: oldPassword
		});
	}

	return (
		<SetPasswordForm
			isExistingUser
			isDefaultUser={getIsDefaultUser(user)}
			submitHandler={handlePasswordSubmit}
		/>
	);
}
