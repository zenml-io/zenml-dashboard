import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { ServerSettigsUpdate, ServerSettings } from "@/types/server";

export async function updateServerSettings(body: ServerSettigsUpdate) {
	const url = createApiPath(apiPaths.settings);

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
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
			.catch(() => "Failed to update Server Settings");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useUpdateServerSettings(
	options?: Omit<UseMutationOptions<ServerSettings, unknown, ServerSettigsUpdate>, "mutationFn">
) {
	return useMutation<ServerSettings, unknown, ServerSettigsUpdate>({
		mutationFn: async (payload) => {
			return updateServerSettings(payload);
		},
		...options
	});
}
