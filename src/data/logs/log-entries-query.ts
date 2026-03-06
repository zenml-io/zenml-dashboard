import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";
import { LogEntriesQueryParams, LogEntriesResponse } from "@/types/logs";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type LogEntriesQuery = {
	logsId: string;
	queries: LogEntriesQueryParams;
};

export function getLogEntriesQueryKey({ logsId }: Pick<LogEntriesQuery, "logsId">) {
	return ["logs", logsId, "entries"] as const;
}

export async function fetchLogEntries({
	logsId,
	queries
}: LogEntriesQuery): Promise<LogEntriesResponse> {
	const queryString = objectToSearchParams(queries).toString();
	const url = createApiPath(apiPaths.logs.entries(logsId)) + (queryString ? `?${queryString}` : "");
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Error while fetching log entries for logs ${logsId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}
