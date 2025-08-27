import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
import { LogPage, RunLogsQueryParams } from "@/types/logs";
import { objectToSearchParams } from "@/lib/url";

export type PipelineRunDetailOverview = {
	runId: string;
	queries: RunLogsQueryParams;
};

export function getRunLogsQueryKey({ runId, queries }: PipelineRunDetailOverview) {
	return ["runs", runId, "logs", queries];
}

export async function fetchRunLogs({
	runId,
	queries
}: PipelineRunDetailOverview): Promise<LogPage> {
	const queryString = objectToSearchParams(queries).toString();
	const url = createApiPath(apiPaths.runs.logs(runId)) + (queryString ? `?${queryString}` : "");
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
	options?: Omit<UseQueryOptions<LogPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<LogPage, FetchError>({
		queryKey: getRunLogsQueryKey(params),
		queryFn: () => fetchRunLogs(params),
		...options
	});
}
