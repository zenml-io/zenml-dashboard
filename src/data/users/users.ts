import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { UserPage } from "@/types/user";

export function getMembersQueryKey() {
	return ["users"];
}

export async function fetchAllUsers() {
	const url = createApiPath(apiPaths.users.all);
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching pipeline namespaces",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useAllMembers(
	options?: Omit<UseQueryOptions<UserPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<UserPage, FetchError>({
		queryKey: getMembersQueryKey(),
		queryFn: () => fetchAllUsers(),
		...options
	});
}
