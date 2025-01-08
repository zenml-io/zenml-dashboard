import { User } from "@/types/user";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";

export function getCurrentUserKey() {
	return ["current-user"];
}

export async function fetchCurrentUser(): Promise<User> {
	const data = await apiClient<User>(apiPaths.currentUser);
	return data;
}

export function useCurrentUser(options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) {
	return useQuery<User>({
		queryKey: getCurrentUserKey(),
		queryFn: async () => fetchCurrentUser(),
		...options
	});
}
