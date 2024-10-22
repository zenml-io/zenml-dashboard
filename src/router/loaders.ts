import { fetchServerSettings, getServerSettingsKey } from "@/data/server/get-server-settings";
import { fetchServerInfo, getServerInfoKey } from "@/data/server/info-query";
import { fetchCurrentUser, getCurrentUserKey } from "@/data/users/current-user-query";
import { QueryClient } from "@tanstack/react-query";

export const authenticatedLayoutLoader = (queryClient: QueryClient) => async () => {
	await Promise.all([
		queryClient
			.ensureQueryData({ queryKey: getCurrentUserKey(), queryFn: fetchCurrentUser })
			.catch(() => {}),
		queryClient
			.ensureQueryData({ queryKey: getServerSettingsKey(), queryFn: fetchServerSettings })
			.catch(() => {})
	]).catch(() => {});
};

export const rootLoader = (queryClient: QueryClient) => async () => {
	await queryClient
		.ensureQueryData({ queryKey: getServerInfoKey(), queryFn: fetchServerInfo })
		.catch(() => {});
	return null;
};
