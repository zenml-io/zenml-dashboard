import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { QueryClient } from "@tanstack/react-query";

export const rootLoader = (queryClient: QueryClient) => async () => {
	await queryClient.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser });
	return null;
};
