import { fetchServerSettings, getServerSettingsKey } from "@/data/server/get-server-settings";
import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { QueryClient } from "@tanstack/react-query";

export const authenticatedLayoutLoader = (queryClient: QueryClient) => async () => {
	await Promise.all([
		queryClient
			.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser })
			// I'm not sure if I like this handling here. A potential check could also be getAuthstate()
			.catch(() => {}),
		queryClient
			.ensureQueryData({ queryKey: getServerSettingsKey(), queryFn: fetchServerSettings })
			.catch(() => {})
	]);
	return null;
};
