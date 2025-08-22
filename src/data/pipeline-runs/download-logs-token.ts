import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
import { RunLogsDownloadTokenQueryParams } from "@/types/pipeline-runs";
import { objectToSearchParams } from "@/lib/url";

type GetDownloadTokenParams = {
	runId: string;
	queryParams: RunLogsDownloadTokenQueryParams;
};

export async function fetchRunLogsDownloadToken({
	runId,
	queryParams
}: GetDownloadTokenParams): Promise<string> {
	const queryString = objectToSearchParams(queryParams);
	const url =
		createApiPath(apiPaths.runs.logsDownloadToken(runId)) + (queryString ? `?${queryString}` : "");
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
			.catch(() => "Error while fetching run logs download token");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useRunLogsDownloadToken(
	options?: UseMutationOptions<string, FetchError, GetDownloadTokenParams, any>
) {
	return useMutation<string, FetchError, GetDownloadTokenParams, unknown>({
		...options,
		mutationFn: async (params: GetDownloadTokenParams) => {
			return fetchRunLogsDownloadToken(params);
		}
	});
}
