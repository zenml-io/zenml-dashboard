import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type PipelineRunDetailOverview = {
	runId: string;
};

export function getRunLogsQueryKey({ runId }: PipelineRunDetailOverview) {
	return ["runs", runId, "logs"];
}

export async function fetchRunLogs({ runId }: PipelineRunDetailOverview): Promise<string> {
	const url = createApiPath(apiPaths.runs.logs(runId));
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
			.catch(() => `Error while fetching logs for run ${runId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useRunLogs(
	params: PipelineRunDetailOverview,
	options?: Omit<UseQueryOptions<string, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<string, FetchError>({
		queryKey: getRunLogsQueryKey(params),
		queryFn: () => fetchRunLogs(params),
		...options
	});
}
