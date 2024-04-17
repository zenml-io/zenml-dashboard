import { FetchError } from "@/lib/fetch-error";
import { LineageGraph } from "@/types/pipeline-runs";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type PipelineRunDetailOverview = {
	runId: string;
};

export function getPipelineRunGraphQueryKey({ runId }: PipelineRunDetailOverview) {
	return ["runs", runId, "graph"];
}

export async function fetchPipelineRunGraph({ runId }: PipelineRunDetailOverview) {
	const url = createApiPath(apiPaths.runs.graph(runId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching pipeline run graph for ${runId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function usePipelineRunGraph(
	params: PipelineRunDetailOverview,
	options?: Omit<UseQueryOptions<LineageGraph, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<LineageGraph, FetchError>({
		queryKey: getPipelineRunGraphQueryKey(params),
		queryFn: () => fetchPipelineRunGraph(params),
		...options
	});
}
