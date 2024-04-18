import { ReasonForm } from "@/components/survey/Reason";
import { useSurvayContext } from "@/components/survey/SurveyContext";
import { ReasonFormType } from "@/components/survey/form-schemas";
import { getCurrentUserKey } from "@/data/users/current-user-query";
import { useUpdateCurrentUserMutation } from "@/data/users/update-current-user-mutation";
import { routes } from "@/router/routes";
import { UserMetadata } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type Props = {
	isDefaultUser: boolean;
};

export function ReasonStep({ isDefaultUser }: Props) {
	const { setSurveyStep } = useSurvayContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { mutate } = useUpdateCurrentUserMutation({
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: [getCurrentUserKey()] });
			if (isDefaultUser) {
				setSurveyStep(4);
				return;
			}
			navigate(routes.home);
		}
	});

	function handleReasonFormSubmit({ other, reasons, otherVal }: ReasonFormType) {
		const reasonsArr = other ? [...reasons, otherVal] : reasons;
		const updateMetadata: UserMetadata = { reasons: reasonsArr as string[] };
		mutate({ user_metadata: updateMetadata });
	}

	return <ReasonForm submitHandler={handleReasonFormSubmit} />;
}
