import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { AboutYouForm } from "@/components/survey/AboutYouForm";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useSurveyUserContext } from "./SurveyUserContext";
import { AboutYouFormType } from "@/components/survey/form-schemas";

type Props = {
	primaryRole?: UserMetadata["primary_role"];
	infraType?: UserMetadata["infra_type"];
};

export function AboutYouStep({ primaryRole, infraType }: Props) {
	const { user } = useSurveyUserContext();
	const { setSurveyStep } = useSurveyContext();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
			setSurveyStep((prev) => prev + 1);
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

	function handleAboutYouSubmit({ primaryRole, infraType }: AboutYouFormType) {
		const updateMetadata: UserMetadata = {
			finished_onboarding_survey: true
		};

		if (primaryRole) updateMetadata.primary_role = primaryRole;
		if (infraType) updateMetadata.infra_type = infraType;

		mutate({ ...user, user_metadata: { ...user.user_metadata, ...updateMetadata } });
	}

	return (
		<AboutYouForm
			primaryRole={primaryRole}
			infraType={infraType}
			submitHandler={handleAboutYouSubmit}
		/>
	);
}
