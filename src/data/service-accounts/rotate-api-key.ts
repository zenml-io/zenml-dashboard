import { FetchError } from "@/lib/fetch-error";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { fetcher } from "../fetch";
import { ApiKey, RotateApi } from "../../types/service-accounts";
import { apiPaths, createApiPath } from "../api";
import { notFound } from "../../lib/not-found-error";

type RotateApiKeyParams = {
	serviceAccountId: string;
	apiKeyId: string;
	body: RotateApi;
};

export async function rotateApiKey({
	apiKeyId,
	body,
	serviceAccountId
}: RotateApiKeyParams): Promise<ApiKey> {
	const url = createApiPath(apiPaths.serviceAccounts.apiKeys.rotate(serviceAccountId, apiKeyId));

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body) // Added body to request
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
			.catch(() => `Failed to rotate key ${apiKeyId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useRotateApiKey(options?: UseMutationOptions<ApiKey, unknown, RotateApiKeyParams>) {
	return useMutation<ApiKey, unknown, RotateApiKeyParams>({
		...options,
		mutationFn: async ({ serviceAccountId, apiKeyId, body }) => {
			return rotateApiKey({ serviceAccountId, apiKeyId, body }); // Pass body to rotateApiKey
		}
	});
}
