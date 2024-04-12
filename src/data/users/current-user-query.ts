import { apiPaths, createApiPath } from "../api";
import { User } from "@/types/user";
import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";

export function getCurrentUserKey() {
	return ["current-user"];
}

export async function fetchCurrentUser(): Promise<User> {
	const url = createApiPath(apiPaths.currentUser);
	// TODO possibly error handling can also be abstracted
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) {
		notFound();
	}

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching models",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useCurrentUser(options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">) {
	return useQuery<User>({
		queryKey: getCurrentUserKey(),
		queryFn: async () => fetchCurrentUser(),
		...options
	});
}
