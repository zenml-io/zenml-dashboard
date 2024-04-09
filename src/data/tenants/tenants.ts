import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
// import { objectToSearchParams } from "@/lib/url";
import { notFound } from "@/lib/not-found-error";
export type Members = {
	params: any;
};

export function getMembersQueryKey({ params }: Members) {
	return ["members", params];
}

export async function fetchAllMembers({ params }: Members, token?: string) {
	const url = createApiPath(apiPaths.members.detail("aaa55726-5040-41cc-8798-847baf4f3a0a"));
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
	params: Members,
	options?: Omit<UseQueryOptions<any, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<any, FetchError>({
		queryKey: getMembersQueryKey(params),
		queryFn: () => fetchAllMembers(params),
		...options
	});
}
