import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { ArtifactVersion } from "@/types/artifact-versions";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";

type ArtifactVersionDetail = {
	versionId: string;
};

export function getArtifactVersionDetailQueryKey({ versionId }: ArtifactVersionDetail) {
	return ["artifact_versions", versionId];
}

export async function fetchArtifactVersionDetail({ versionId }: ArtifactVersionDetail) {
	const url = createApiPath(apiPaths.artifactVersions.detail(versionId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) {
		notFound();
	}

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching artifact version ${versionId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useArtifactVersion(
	params: ArtifactVersionDetail,
	options?: Omit<UseQueryOptions<ArtifactVersion, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<ArtifactVersion, FetchError>({
		queryKey: getArtifactVersionDetailQueryKey(params),
		queryFn: () => fetchArtifactVersionDetail(params),
		...options
	});
}
