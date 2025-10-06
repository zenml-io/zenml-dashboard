import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";
import { PipelineRunOvervieweParams, PipelineRunPage } from "@/types/pipeline-runs";
import { UseQueryOptions, infiniteQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
export type PipelineRunOverview = {
	params: PipelineRunOvervieweParams;
};

export function getPipelineRunQueryKey({ params }: PipelineRunOverview) {
	return ["runs", params];
}

export async function fetchAllPipelineRuns({ params }: PipelineRunOverview) {
	const url = createApiPath(apiPaths.runs.all + "?" + objectToSearchParams(params));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching pipeline runs",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useAllPipelineRuns(
	params: PipelineRunOverview,
	options?: Omit<UseQueryOptions<PipelineRunPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<PipelineRunPage, FetchError>({
		queryKey: getPipelineRunQueryKey(params),
		queryFn: () => fetchAllPipelineRuns(params),
		...options
	});
}

export function allPipelineRunsInfinite(queryParams: PipelineRunOverview) {
	return infiniteQueryOptions({
		queryKey: [...getPipelineRunQueryKey(queryParams), "infinite"],
		queryFn: ({ pageParam }) =>
			fetchAllPipelineRuns({ params: { ...queryParams.params, page: pageParam } }),
		getNextPageParam: (lastPage) =>
			lastPage.index < lastPage.total_pages ? lastPage.index + 1 : null,
		initialPageParam: 1
	});
}
