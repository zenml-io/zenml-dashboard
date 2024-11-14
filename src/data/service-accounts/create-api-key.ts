import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { FetchError } from "@/lib/fetch-error";
import { ApiKey, CreateApiKey } from "@/types/service-accounts";
import { apiPaths, createApiPath } from "../api";

type ServiceAccountOverview = {
	body: CreateApiKey;
	serviceAccountId: string;
};

export async function createApiKey({
	body,
	serviceAccountId
}: ServiceAccountOverview): Promise<ApiKey> {
	const url = createApiPath(apiPaths.serviceAccounts.apiKeys.all(serviceAccountId));
	const res = await fetcher(url, {
		method: "POST",
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
			.catch(() => `Failed to create service account`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateApiKey(
	options?: UseMutationOptions<ApiKey, unknown, ServiceAccountOverview>
) {
	return useMutation<ApiKey, unknown, ServiceAccountOverview>({
		...options,
		mutationFn: async ({ serviceAccountId, body }) => {
			return createApiKey({ body, serviceAccountId });
		}
	});
}
