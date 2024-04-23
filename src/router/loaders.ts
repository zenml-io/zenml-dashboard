import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { QueryClient } from "@tanstack/react-query";

export const authenticatedLayoutLoader = (queryClient: QueryClient) => async () => {
	await queryClient
		.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser })
		// I'm not sure if I like this handling here. A potential check could also be getAuthstate()
		.catch(() => {});
	return null;
};
