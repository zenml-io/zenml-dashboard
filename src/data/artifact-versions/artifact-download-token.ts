import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type GetDownloadTokenParams = {
	artifactVersionId: string;
};

export async function fetchArtifactDownloadToken({
	artifactVersionId
}: GetDownloadTokenParams): Promise<string> {
	const url = createApiPath(apiPaths.artifactVersions.downloadToken(artifactVersionId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
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
			.catch(() => "Error while fetching artifact download token");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useArtifactVersionDownloadToken(
	options?: UseMutationOptions<string, FetchError, GetDownloadTokenParams, any>
) {
	return useMutation<string, FetchError, GetDownloadTokenParams, unknown>({
		...options,
		mutationFn: async (params: GetDownloadTokenParams) => {
			return fetchArtifactDownloadToken(params);
		}
	});
}
