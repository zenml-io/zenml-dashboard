import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { LogResponse } from "@/types/logs";

type StepLogs = {
	stepId: string;
};

export function getStepLogsQueryKey({ stepId }: StepLogs) {
	return ["logs", stepId];
}

export async function fetchStepLogs({ stepId }: StepLogs) {
	const url = createApiPath(apiPaths.steps.logs(stepId));
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
			.catch(() => `Error while fetching logs for step ${stepId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useStepLogs(
	params: StepLogs,
	options?: Omit<UseQueryOptions<LogResponse, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<LogResponse, FetchError>({
		queryKey: getStepLogsQueryKey(params),
		queryFn: () => fetchStepLogs(params),
		...options
	});
}
