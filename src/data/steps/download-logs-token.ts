import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type GetDownloadTokenParams = {
	stepId: string;
};

export async function fetchStepLogsDownloadToken({
	stepId
}: GetDownloadTokenParams): Promise<string> {
	const url = createApiPath(apiPaths.steps.logsDownloadToken(stepId));
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
			.catch(() => "Error while fetching step logs download token");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useStepLogsDownloadToken(
	options?: UseMutationOptions<string, FetchError, GetDownloadTokenParams, any>
) {
	return useMutation<string, FetchError, GetDownloadTokenParams, unknown>({
		...options,
		mutationFn: async (params: GetDownloadTokenParams) => {
			return fetchStepLogsDownloadToken(params);
		}
	});
}
