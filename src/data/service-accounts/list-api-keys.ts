import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { objectToSearchParams } from "@/lib/url";
import { ApiKeyList, ListServiceAccountsParams } from "../../types/service-accounts";
import { apiPaths, createApiPath } from "../api";
import { notFound } from "../../lib/not-found-error";

export type ServiceAccountDetailsOverview = {
	serviceAccountId: string;
	params: ListServiceAccountsParams;
};

export async function fetchServiceAccountApiKeys({
	serviceAccountId,
	params
}: ServiceAccountDetailsOverview): Promise<ApiKeyList> {
	const url =
		createApiPath(apiPaths.serviceAccounts.apiKeys.all(serviceAccountId)) +
		"?" +
		objectToSearchParams(params);

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
			.catch(() => `Failed to list of api keys`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
