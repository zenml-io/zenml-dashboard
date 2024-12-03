import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { ApiKey } from "@/types/service-accounts";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type ServiceAccountDetailsOverview = {
	serviceAccountId: string;
	apiKeyId: string;
};

export async function fetchApiKeyDetail({
	serviceAccountId,
	apiKeyId
}: ServiceAccountDetailsOverview): Promise<ApiKey> {
	const url = createApiPath(apiPaths.serviceAccounts.apiKeys.detail(serviceAccountId, apiKeyId));
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
			.catch(() => `Failed to fetch api key ${apiKeyId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
