import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { QueryClient } from "@tanstack/react-query";
import { getAuthState } from "@/lib/sessions";

export const rootLoader = (queryClient: QueryClient) => async () => {
	if (getAuthState())
		await queryClient.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser });
	return null;
};
