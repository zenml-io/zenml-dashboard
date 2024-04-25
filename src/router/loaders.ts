import { fetchServerInfo, getServerInfoKey } from "@/data/server/info-query";
import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { getAuthState } from "@/lib/sessions";
import { QueryClient } from "@tanstack/react-query";

export const authenticatedLayoutLoader = (queryClient: QueryClient) => async () => {
	if (getAuthState()) {
		await queryClient
			.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser })
			// I'm not sure if I like this handling here. A potential check could also be getAuthstate()
			.catch(() => {});
	}
	return null;
};

export const rootLoader = (queryClient: QueryClient) => async () => {
	await queryClient
		.ensureQueryData({ queryKey: getServerInfoKey(), queryFn: fetchServerInfo })
		.catch(() => {});
	return null;
};
