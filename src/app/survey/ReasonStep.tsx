import { ReasonForm } from "@/components/survey/Reason";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { ReasonFormType } from "@/components/survey/form-schemas";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { routes } from "@/router/routes";
import { UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import AlertCircle from "@/assets/icons/alert-circle.svg?react";

type Props = {
	isDefaultUser: boolean;
};

export function ReasonStep({ isDefaultUser }: Props) {
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

	function handleReasonFormSubmit({ other, reasons, otherVal }: ReasonFormType) {
		const reasonsArr = other ? [...reasons, otherVal] : reasons;
		const updateMetadata: UserMetadata = { reasons: reasonsArr as string[] };
		mutate({ metadata: updateMetadata });
	}

	return <ReasonForm submitHandler={handleReasonFormSubmit} />;
}
