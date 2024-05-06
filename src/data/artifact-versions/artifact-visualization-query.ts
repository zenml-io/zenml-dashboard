import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ArtifactVisualization as VisualizationType } from "@/types/artifact-versions";
import { fetcher } from "../fetch";

type ArtifactVisualization = {
	versionId: string;
};

export function getArtifactVisualizationQueryKey({ versionId }: ArtifactVisualization) {
	return ["artifact_versions", versionId, "visualize"];
}

export async function fetchArtifactVisualization(
	{ versionId }: ArtifactVisualization,
	signal?: AbortSignal
) {
	const url = createApiPath(apiPaths.artifactVersions.visualize(versionId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
		signal
	});

	if (res.status === 404) {
		const data: string[] = await res
			.json()
			.then((data) => data.detail)
			.catch(() => ["", "Failed to fetch artifact visualization"]);
		throw new FetchError({
			message: data[1] || "Failed to fetch artifact visualization",
			status: res.status,
			statusText: res.statusText
		});
	}

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching artifact visualization for version ${versionId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useArtifactVisualization(
	params: ArtifactVisualization,
	options?: Omit<UseQueryOptions<VisualizationType, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<VisualizationType, FetchError>({
		queryKey: getArtifactVisualizationQueryKey(params),
		queryFn: ({ signal }) => fetchArtifactVisualization(params, signal),
		...options
	});
}
