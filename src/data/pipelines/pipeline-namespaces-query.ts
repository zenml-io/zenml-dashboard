import { PipelineNameSpacesPage, PipelineNamespacesParams } from "@/types/pipelines";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
export type PipelineOverview = {
	params: PipelineNamespacesParams;
};

export function getPipelinesQueryKey({ params }: PipelineOverview) {
	return ["pipeline_namespaces", params];
}

export async function fetchAllPipelines({ params }: PipelineOverview, token?: string) {
	const url = createApiPath(apiPaths.pipelines.namespaces + "?" + objectToSearchParams(params));
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
			message: "Error while fetching pipeline namespaces",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useAllPipelineNamespaces(
	params: PipelineOverview,
	options?: Omit<UseQueryOptions<PipelineNameSpacesPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<PipelineNameSpacesPage, FetchError>({
		queryKey: getPipelinesQueryKey(params),
		queryFn: () => fetchAllPipelines(params),
		...options
	});
}
