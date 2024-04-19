import { AwarenessForm } from "@/components/survey/AwarenessChannel";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { AwarenessFormType } from "@/components/survey/form-schemas";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { routes } from "@/router/routes";
import { User, UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";

type Props = {
	isDefaultUser: boolean;
	user: User;
};

export function AwarenessStep({ isDefaultUser, user }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const navigate = useNavigate();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
			if (isDefaultUser) {
				setSurveyStep(5);
				return;
			}
			navigate(routes.home);
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
		mutate({ metadata: { ...user.metadata?.metadata, ...updateMetadata } });
	}

	return <AwarenessForm submitHandler={handleAwarenessFormSubmit} />;
}
