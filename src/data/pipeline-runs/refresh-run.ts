import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { RunRefreshQueryParams } from "@/types/pipeline-runs";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type RunRefreshParams = {
	runId: string;
	queries: RunRefreshQueryParams;
};

async function refreshRun({
	runId,
	queries = { include_steps: false }
}: RunRefreshParams): Promise<string> {
	const queryString = objectToSearchParams(queries).toString();
	const url = createApiPath(apiPaths.runs.refresh(runId)) + (queryString ? `?${queryString}` : "");
	const res = await fetcher(url, {
		method: "POST"
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
			.catch(() => `Error while refreshing run ${runId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}
export function useRefreshRun(
	options?: UseMutationOptions<string, FetchError, RunRefreshParams, unknown>
) {
	return useMutation<string, FetchError, RunRefreshParams, unknown>({
		...options,
		mutationFn: async (params: RunRefreshParams) => {
			return refreshRun({ runId: params.runId, queries: params.queries });
		}
	});
}
