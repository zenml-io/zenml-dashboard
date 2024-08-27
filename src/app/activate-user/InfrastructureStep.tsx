import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { InfrastructureForm } from "@/components/survey/Infrastructure";
import { InfrastructureFormType } from "@/components/survey/form-schemas";
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

export function InfraStep({ userId, setUsername }: Props) {
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

	function handleInfraFormSubmit({ other, providers, otherVal }: InfrastructureFormType) {
		const providerArr = other ? [...providers, otherVal] : providers;
		const updateMetadata: UserMetadata = { infra_providers: providerArr as string[] };
		mutate({
			userId,
			body: { ...newUser, user_metadata: { ...newUser.user_metadata, ...updateMetadata } }
		});
	}

	return <InfrastructureForm submitHandler={handleInfraFormSubmit} />;
}
