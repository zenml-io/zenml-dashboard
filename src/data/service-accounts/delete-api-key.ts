import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";

export async function deleteApiKey(serviceAccountId: string, apiKeyId: string) {
	const url = createApiPath(apiPaths.serviceAccounts.apiKeys.detail(serviceAccountId, apiKeyId));

	const res = await fetcher(url, {
		method: "DELETE",
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
			.catch(() => `Failed to delete api key ${apiKeyId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

interface DeleteApiKeyParams {
	serviceAccountId: string;
	apiKeyId: string;
}

export function useDeleteApiKey(options?: UseMutationOptions<void, unknown, DeleteApiKeyParams>) {
	return useMutation<void, unknown, DeleteApiKeyParams>({
		...options,
		mutationFn: async ({ serviceAccountId, apiKeyId }) => {
			await deleteApiKey(serviceAccountId, apiKeyId);
		}
	});
}
