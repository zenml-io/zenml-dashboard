import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { ListUserParams, UserPage } from "@/types/user";
import { fetcher } from "../fetch";
import { objectToSearchParams } from "@/lib/url";

type UserOverview = {
	params: ListUserParams;
};

export function getMembersQueryKey({ params }: UserOverview) {
	return ["users", params];
}

export async function fetchAllUsers({ params }: UserOverview) {
	const url = createApiPath(apiPaths.users.all + "?" + objectToSearchParams(params));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching users",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useAllMembers(
	params: UserOverview,
	options?: Omit<UseQueryOptions<UserPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<UserPage, FetchError>({
		queryKey: getMembersQueryKey(params),
		queryFn: () => fetchAllUsers(params),
		...options
	});
}
