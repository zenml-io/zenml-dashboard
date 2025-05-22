import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { Dag } from "@/types/dag-visualizer";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type PipelineRunDetailOverview = {
	runId: string;
};

export function getPipelineRunDagQueryKey({ runId }: PipelineRunDetailOverview) {
	return ["runs", runId, "dag"];
}

export async function fetchPipelineRunDag({ runId }: PipelineRunDetailOverview): Promise<Dag> {
	const url = createApiPath(apiPaths.runs.dag(runId));
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

export function usePipelineRunDag(
	params: PipelineRunDetailOverview,
	options?: Omit<UseQueryOptions<Dag, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<Dag, FetchError>({
		queryKey: getPipelineRunDagQueryKey(params),
		queryFn: () => fetchPipelineRunDag(params),
		...options
	});
}
