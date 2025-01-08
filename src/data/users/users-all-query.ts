import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { ListUserParams, UserPage } from "@/types/user";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths } from "../api";
import { apiClient } from "../api-client";

type UserOverview = {
	params: ListUserParams;
};

export function getMembersQueryKey({ params }: UserOverview) {
	return ["users", params];
}

export async function fetchAllUsers({ params }: UserOverview) {
	const data = await apiClient<UserPage>(apiPaths.users.all + "?" + objectToSearchParams(params));
	return data;
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
