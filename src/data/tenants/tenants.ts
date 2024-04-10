import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
// import { objectToSearchParams } from "@/lib/url";
import { notFound } from "@/lib/not-found-error";
import { User } from "@/types/user";

export function getMembersQueryKey() {
	return ["members"];
}

export async function fetchAllMembers(token?: string) {
	const url = createApiPath(apiPaths.users.all);
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` })
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
	options?: Omit<UseQueryOptions<User[], FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<User[], FetchError>({
		queryKey: getMembersQueryKey(),
		queryFn: () => fetchAllMembers(),
		...options
	});
}
