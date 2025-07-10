import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { AiChallengesForm } from "@/components/survey/ai-challenge";
import { AiChallengesFormType } from "@/components/survey/form-schemas";
import { useActivateUser } from "@/data/users/activate-user-mutation";
import { useToast } from "@zenml-io/react-component-library";
import { useActivationContext } from "./ActivationContext";
import { UserMetadata } from "@/types/user";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useLoginMutation } from "@/data/session/login-mutation";
import { useAuthContext } from "@/context/AuthContext";
import { Dispatch, SetStateAction } from "react";

type Props = {
	userId: string;
	setUsername: Dispatch<SetStateAction<string>>;
};

export function AiChallengesStep({ userId, setUsername }: Props) {
	const { newUser } = useActivationContext();
	const { setAuthState } = useAuthContext();
	const { setSurveyStep } = useSurveyContext();
	const { mutate: loginMutate } = useLoginMutation({
		onSuccess: () => {
			setAuthState("true");
			setSurveyStep((prev) => prev + 1);
		}
	});
	const { toast } = useToast();
	const { mutate } = useActivateUser({
		onSuccess: async (data) => {
			setUsername(data.name);
			loginMutate({ username: data.name, password: newUser.password ?? undefined });
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

	function handleAiChallengesSubmit({ aiTypes, biggestChallenge }: AiChallengesFormType) {
		const updateMetadata: UserMetadata = {
			ai_types_working_with: aiTypes,
			biggest_ai_challenges: biggestChallenge,
			finished_onboarding_survey: true
		};
		mutate({
			userId,
			body: { ...newUser, user_metadata: { ...newUser.user_metadata, ...updateMetadata } }
		});
	}

	return <AiChallengesForm submitHandler={handleAiChallengesSubmit} />;
}
