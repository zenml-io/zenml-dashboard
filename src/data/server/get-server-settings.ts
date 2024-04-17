import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { ServerSettings } from "@/types/server";

export function getServerSettingsKey() {
	return ["settings"];
}

export async function fetchServerSettings(): Promise<ServerSettings> {
	const url = createApiPath(apiPaths.settings);
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
				if (data.detail instanceof Array) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Failed to load Server Settings");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useServerInfo(
	options?: Omit<UseQueryOptions<ServerSettings>, "queryKey" | "queryFn">
) {
	return useQuery<ServerSettings>({
		queryKey: getServerSettingsKey(),
		queryFn: async () => fetchServerSettings(),
		...options
	});
}
