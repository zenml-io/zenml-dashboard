import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { ServerActivationPayload } from "@/types/server";
import { User } from "@/types/user";

export async function updateServerSettings(body: ServerActivationPayload) {
	const url = createApiPath(apiPaths.activate);

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
				if (data.detail instanceof Array) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Failed to activate server");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useActivateServer(
	options?: Omit<UseMutationOptions<User, unknown, ServerActivationPayload>, "mutationFn">
) {
	return useMutation<User, unknown, ServerActivationPayload>({
		mutationFn: async (payload) => {
			return updateServerSettings(payload);
		},
		...options
	});
}
