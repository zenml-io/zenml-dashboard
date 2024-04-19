import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { AwarenessForm } from "@/components/survey/AwarenessChannel";
import { AwarenessFormType } from "@/components/survey/form-schemas";
import { useActivateUser } from "@/data/users/activate-user-mutation";
import { routes } from "@/router/routes";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import { useActivationContext } from "./ActivationContext";
import { UserMetadata } from "@/types/user";

type Props = {
	userId: string;
};

export function AwarenessStep({ userId }: Props) {
	const { newUser } = useActivationContext();
	const navigate = useNavigate();
	const { toast } = useToast();
	const { mutate } = useActivateUser({
		onSuccess: async () => {
			navigate(routes.login);
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

	function handleAwarenessFormSubmit({ other, channels, otherVal }: AwarenessFormType) {
		const channelArr = other ? [...channels, otherVal] : channels;
		const updateMetadata: UserMetadata = { awareness_channels: channelArr as string[] };
		mutate({ userId, body: { ...newUser, metadata: { ...newUser.metadata, ...updateMetadata } } });
	}

	return <AwarenessForm submitHandler={handleAwarenessFormSubmit} />;
}
