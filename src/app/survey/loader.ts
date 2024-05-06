import { QueryClient } from "@tanstack/react-query";
import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";

export const surveyLoader = (queryClient: QueryClient) => async () => {
	await queryClient.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser });
	return null;
};
