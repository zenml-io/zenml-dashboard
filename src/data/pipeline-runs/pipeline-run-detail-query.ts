import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { PipelineRun } from "@/types/pipeline-runs";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
export type PipelineRunDetailOverview = {
	runId: string;
};

export function getPipelineRunDetailQueryKey({ runId }: PipelineRunDetailOverview) {
	return ["runs", runId];
}

export async function fetchPipelineRun({ runId }: PipelineRunDetailOverview) {
	const url = createApiPath(apiPaths.runs.detail(runId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching pipeline run ${runId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function usePipelineRun(
	params: PipelineRunDetailOverview,
	options?: Omit<UseQueryOptions<PipelineRun, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<PipelineRun, FetchError>({
		queryKey: getPipelineRunDetailQueryKey(params),
		queryFn: () => fetchPipelineRun(params),
		...options
	});
}
