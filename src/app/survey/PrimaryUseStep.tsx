import { PrimaryUseForm } from "@/components/survey/PrimaryUse";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { PrimaryUseFormType } from "@/components/survey/form-schemas";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { User, UserMetadata } from "@/types/user";
import { useToast } from "@zenml-io/react-component-library";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUserKey } from "@/data/users/current-user-query";

type Props = {
	user: User;
};

export function PrimaryUseStep({ user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
			setSurveyStep(4);
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
	function handlePrimaryUseSubmit({ amountProductionModels, primaryUse }: PrimaryUseFormType) {
		const metadata: UserMetadata = {
			models_production: amountProductionModels,
			primary_use: primaryUse
		};
		mutate({ metadata: metadata });
	}

	return <PrimaryUseForm user={user} submitHandler={handlePrimaryUseSubmit} />;
}
