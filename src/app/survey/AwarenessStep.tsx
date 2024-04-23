import { AwarenessForm } from "@/components/survey/AwarenessChannel";
import { AwarenessFormType } from "@/components/survey/form-schemas";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { routes } from "@/router/routes";
import { UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useSurveyUserContext } from "./SurveyUserContext";

export function AwarenessStep() {
	const navigate = useNavigate();
	const { user } = useSurveyUserContext();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: getCurrentUserKey() });
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
		mutate({ ...user, metadata: { ...user.metadata, ...updateMetadata } });
	}

	return <AwarenessForm submitHandler={handleAwarenessFormSubmit} />;
}
