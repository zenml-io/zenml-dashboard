import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { LineageGraph } from "@/types/pipeline-runs";
export type PipelineRunDetailOverview = {
	runId: string;
};

export function getPipelineRunGraphQueryKey({ runId }: PipelineRunDetailOverview) {
	return ["runs", runId, "graph"];
}

export async function fetchPipelineRunGraph({ runId }: PipelineRunDetailOverview, token?: string) {
	const url = createApiPath(apiPaths.runs.graph(runId));
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` })
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
