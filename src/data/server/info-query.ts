import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { ServerInfo } from "@/types/server-info";

export function getServerInfoKey() {
	return ["info"];
}

export async function fetchServerInfo(): Promise<ServerInfo> {
	const url = createApiPath(apiPaths.info);
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching server info",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useServerInfo(options?: Omit<UseQueryOptions<ServerInfo>, "queryKey" | "queryFn">) {
	return useQuery<ServerInfo>({
		queryKey: getServerInfoKey(),
		queryFn: async () => fetchServerInfo(),
		...options
	});
}
