import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetch";

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
		const errorData = await res.json().catch(() => ({}));
		throw new FetchError({
			message:
				(errorData.detail[1].includes("File") && errorData.detail[1]) ||
				`The logs for step ${stepId} cannot be fetched or this pipeline run ran locally and logs were not tracked`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useStepLogs(
	params: StepLogs,
	options?: Omit<UseQueryOptions<string, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<string, FetchError>({
		queryKey: getStepLogsQueryKey(params),
		queryFn: () => fetchStepLogs(params),
		...options
	});
}
