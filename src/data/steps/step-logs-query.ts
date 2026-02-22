import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQueries, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { LogResponse } from "@/types/logs";
import { StepLogsQueryParams } from "@/types/steps";
import { objectToSearchParams } from "@/lib/url";
import { useMemo } from "react";

type StepLogs = {
	stepId: string;
	queries: StepLogsQueryParams;
};

export function getStepLogsQueryKey({ stepId, queries }: StepLogs) {
	return ["logs", stepId, queries];
}

export async function fetchStepLogs({ stepId, queries }: StepLogs) {
	const queryString = objectToSearchParams(queries).toString();
	const url = createApiPath(apiPaths.steps.logs(stepId) + (queryString ? `?${queryString}` : ""));
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

type StepLogsForSourcesParams = {
	stepId: string;
	sources: string[];
	enabled?: boolean;
};

type StepLogsForSourcesResult = {
	dataBySource: Record<string, LogResponse>;
	isPending: boolean;
	isError: boolean;
	errors: Record<string, FetchError>;
	refetchAll: () => Promise<unknown[]>;
};

/**
 * Fetches logs for multiple sources in parallel using one TanStack Query per
 * source. Results are individually cached so switching between "All Sources"
 * and a single source reuses already-fetched data.
 */
export function useStepLogsForSources(params: StepLogsForSourcesParams): StepLogsForSourcesResult {
	const { stepId, sources, enabled = true } = params;

	const queryResults = useQueries({
		queries: sources.map((source) => ({
			queryKey: getStepLogsQueryKey({ stepId, queries: { source } }),
			queryFn: () => fetchStepLogs({ stepId, queries: { source } }),
			enabled
		}))
	});

	const dataBySource = useMemo(() => {
		const result: Record<string, LogResponse> = {};
		sources.forEach((source, i) => {
			const qr = queryResults[i];
			if (qr.data) result[source] = qr.data;
		});
		return result;
	}, [sources, queryResults]);

	const errors = useMemo(() => {
		const result: Record<string, FetchError> = {};
		sources.forEach((source, i) => {
			const qr = queryResults[i];
			if (qr.error) result[source] = qr.error as FetchError;
		});
		return result;
	}, [sources, queryResults]);

	const hasAnyData = Object.keys(dataBySource).length > 0;
	const isPending = queryResults.some((qr) => qr.isPending) && !hasAnyData;
	const isError = queryResults.every((qr) => qr.isError);

	const refetchAll = () => Promise.all(queryResults.map((qr) => qr.refetch()));

	return { dataBySource, isPending, isError, errors, refetchAll };
}
