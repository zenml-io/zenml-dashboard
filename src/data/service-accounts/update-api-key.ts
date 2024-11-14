import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateApiKey } from "../../types/service-accounts";
import { notFound } from "../../lib/not-found-error";
import { apiPaths, createApiPath } from "../api";

type RotateApiKeyParams = {
	serviceAccountId: string;
	apiKeyId: string;
	body: UpdateApiKey;
};

export async function updateApiKey({ apiKeyId, body, serviceAccountId }: RotateApiKeyParams) {
	const url = createApiPath(apiPaths.serviceAccounts.apiKeys.detail(serviceAccountId, apiKeyId));

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (res.status === 404) {
		notFound();
	}

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[0];
				}
				return data.detail || "An error occurred";
			})
			.catch(() => `Failed to update key ${apiKeyId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useUpdateApiKey(
	options?: UseMutationOptions<void, FetchError, RotateApiKeyParams>
) {
	return useMutation<void, FetchError, RotateApiKeyParams>({
		...options,
		mutationFn: async ({ serviceAccountId, apiKeyId, body }) => {
			await updateApiKey({ serviceAccountId, apiKeyId, body });
		}
	});
}
