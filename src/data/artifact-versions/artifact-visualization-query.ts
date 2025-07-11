import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { LoadedVisualization, ArtifactVisualizationQueryParams } from "@/types/artifact-versions";
import { fetcher } from "../fetch";
import { objectToSearchParams } from "@/lib/url";

type ArtifactVisualization = {
	versionId: string;
	params?: ArtifactVisualizationQueryParams;
};

export function getArtifactVisualizationQueryKey({ versionId, params }: ArtifactVisualization) {
	return ["artifact_versions", versionId, "visualize", params];
}

export async function fetchArtifactVisualization(
	{ versionId, params = {} }: ArtifactVisualization,
	signal?: AbortSignal
) {
	const queryParams = objectToSearchParams(params).toString();
	const url = createApiPath(
		apiPaths.artifactVersions.visualize(versionId) + (queryParams ? `?${queryParams}` : "")
	);
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		signal
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Error while fetching artifact visualization for ${versionId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useArtifactVisualization(
	params: ArtifactVisualization,
	options?: Omit<UseQueryOptions<LoadedVisualization, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<LoadedVisualization, FetchError>({
		queryKey: getArtifactVisualizationQueryKey(params),
		queryFn: ({ signal }) => fetchArtifactVisualization(params, signal),
		...options
	});
}
