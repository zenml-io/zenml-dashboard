import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { PipelineBuildResponse } from "@/types/pipeline-builds";
export type PipelineBuildOverview = {
	buildId: string;
};

export function getPipelineBuildQueryKey({ buildId }: PipelineBuildOverview) {
	return ["pipeline-builds", buildId];
}

export async function fetchAllPipelineBuilds({ buildId }: PipelineBuildOverview, token?: string) {
	const url = createApiPath(apiPaths.runs.detail(buildId));

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
			message: `Error while fetching pipeline build ${buildId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function usePipelineBuild(
	params: PipelineBuildOverview,
	options?: Omit<UseQueryOptions<PipelineBuildResponse, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<PipelineBuildResponse, FetchError>({
		queryKey: getPipelineBuildQueryKey(params),
		queryFn: () => fetchAllPipelineBuilds(params),
		...options
	});
}
