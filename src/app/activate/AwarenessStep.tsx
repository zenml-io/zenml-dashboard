import { Icon } from "@/components/Icon";
import { AwarenessForm } from "@/components/survey/AwarenessChannel";
import { useSurveyContext } from "@/components/survey/SurveyContext";
import { AwarenessFormType } from "@/components/survey/form-schemas";
import { useAuthContext } from "@/context/AuthContext";
import { useLoginMutation } from "@/data/session/login-mutation";
import { useActivateUser } from "@/data/users/activate-user-mutation";
import { UserMetadata } from "@/types/user";
import { useToast } from "@zenml-io/react-component-library";
import { useActivationContext } from "./ActivationContext";

type Props = {
	userId: string;
};

export function AwarenessStep({ userId }: Props) {
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
			loginMutate({ username: data.name, password: newUser.password });
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					status: "error",
					emphasis: "subtle",
					icon: <Icon name="alert-circle" className="h-5 w-5 shrink-0 fill-error-700" />,
					description: error.message,
					rounded: true
				});
			}
		}
	});

	function handleAwarenessFormSubmit({ other, channels, otherVal }: AwarenessFormType) {
		const channelArr = other ? [...channels, otherVal] : channels;
		const updateMetadata: UserMetadata = { awareness_channels: channelArr as string[] };
		mutate({ userId, body: { ...newUser, metadata: { ...newUser.metadata, ...updateMetadata } } });
	}

	return <AwarenessForm submitHandler={handleAwarenessFormSubmit} />;
}
