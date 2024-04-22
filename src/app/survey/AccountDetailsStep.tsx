import { User } from "@/types/user";
import { AccountDetailsForm } from "@/components/survey/AccountDetailsForm";
import { AccountDetailForm } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { useToast } from "@zenml-io/react-component-library";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { getIsDefaultUser } from "@/lib/user";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUserKey } from "@/data/users/current-user-query";

type Props = {
	user: User;
};

export function AccountDetailsStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
			setSurveyStep(2);
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

	function handleDetailsSubmit({ fullName, getUpdates, email, username }: AccountDetailForm) {
		mutate({
			email,
			full_name: fullName,
			name: username,
			email_opted_in: getUpdates
		});
	}

	return (
		<AccountDetailsForm
			isDefaultUser={getIsDefaultUser(user)}
			email={user.metadata?.email}
			fullName={user.body?.full_name}
			username={user.name}
			submitHandler={handleDetailsSubmit}
		/>
	);
}
