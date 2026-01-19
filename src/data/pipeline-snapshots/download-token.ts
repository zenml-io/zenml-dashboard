import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type GetDownloadTokenParams = {
	snapshotId: string;
};

export async function fetchSnapshotDownloadToken({
	snapshotId
}: GetDownloadTokenParams): Promise<string> {
	const url = createApiPath(apiPaths.pipeline_snapshots.downloadToken(snapshotId));
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
			.catch(() => "Error while fetching snapshot download token");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useSnapshotDownloadToken(
	options?: UseMutationOptions<string, FetchError, GetDownloadTokenParams>
) {
	return useMutation<string, FetchError, GetDownloadTokenParams, unknown>({
		...options,
		mutationFn: async (params: GetDownloadTokenParams) => {
			return fetchSnapshotDownloadToken(params);
		}
	});
}
