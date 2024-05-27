import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { CodeRepository } from "@/types/code-repository";

export type CodeRepositoryDetail = {
	repositoryId: string;
};

export function getCodeRepositoryDetailQueryKey({ repositoryId }: CodeRepositoryDetail) {
	return ["code_repositories", repositoryId];
}

export async function fetchAllCodeRepositories({ repositoryId }: CodeRepositoryDetail) {
	const url = createApiPath(apiPaths.code_repositories.detail(repositoryId));
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
			message: `Error while fetching code repository ${repositoryId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useCodeRepository(
	repositoryId: CodeRepositoryDetail,
	options?: Omit<UseQueryOptions<CodeRepository, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<CodeRepository, FetchError>({
		queryKey: getCodeRepositoryDetailQueryKey(repositoryId),
		queryFn: () => fetchAllCodeRepositories(repositoryId),
		...options
	});
}
