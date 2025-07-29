import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { AiChallengesForm } from "@/components/survey/ai-challenge";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { AiChallengesFormType } from "@/components/survey/form-schemas";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useSurveyUserContext } from "./SurveyUserContext";

export function AiChallengesStep() {
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

	function handleAiChallengesSubmit({ biggestChallenge, aiTypes }: AiChallengesFormType) {
		const updateMetadata: UserMetadata = {
			ai_types_working_with: aiTypes,
			biggest_ai_challenges: biggestChallenge,
			finished_onboarding_survey: true
		};
		mutate({ ...user, user_metadata: { ...user.user_metadata, ...updateMetadata } });
	}

	return <AiChallengesForm submitHandler={handleAiChallengesSubmit} />;
}
