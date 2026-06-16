import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { AboutYouForm } from "@/components/survey/AboutYouForm";
import { AboutYouFormType } from "@/components/survey/form-schemas";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { useAuthContext } from "@/context/AuthContext";
import { useLoginMutation } from "@/data/session/login-mutation";
import { useActivateUser } from "@/data/users/activate-user-mutation";
import { UserMetadata } from "@/types/user";
import { useToast } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction } from "react";
import { useActivationContext } from "./ActivationContext";

type Props = {
	userId: string;
	setUsername: Dispatch<SetStateAction<string>>;
};

export function AboutYouStep({ userId, setUsername }: Props) {
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

	function handleAboutYouSubmit({ primaryRole, infraType }: AboutYouFormType) {
		const updateMetadata: UserMetadata = {
			primary_role: primaryRole,
			infra_type: infraType,
			finished_onboarding_survey: true
		};
		mutate({
			userId,
			body: { ...newUser, user_metadata: { ...newUser.user_metadata, ...updateMetadata } }
		});
	}

	return <AboutYouForm submitHandler={handleAboutYouSubmit} />;
}
