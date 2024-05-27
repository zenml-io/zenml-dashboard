import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { notFound } from "@/lib/not-found-error";
import {
	CodeRepositoryListQueryParams,
	PageCodeRepositoryResponse
} from "@/types/artifact-versions";
import { apiPaths, createApiPath } from "../api";

export type CodeRepositoriesList = {
	params: CodeRepositoryListQueryParams;
};

export function getCodeRepositoryDetailQueryKey({ params }: CodeRepositoriesList) {
	return ["code_repositories", params];
}

export async function fetchAllCodeRepositories({ params }: CodeRepositoriesList) {
	const url = createApiPath(apiPaths.code_repositories.all + "?" + objectToSearchParams(params));
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) {
		notFound();
	}

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching code repositories`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useCodeRepositoryList(
	params: CodeRepositoriesList,
	options?: Omit<UseQueryOptions<PageCodeRepositoryResponse, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<PageCodeRepositoryResponse, FetchError>({
		queryKey: getCodeRepositoryDetailQueryKey(params),
		queryFn: () => fetchAllCodeRepositories(params),
		...options
	});
}
