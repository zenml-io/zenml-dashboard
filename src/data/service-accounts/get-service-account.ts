import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { notFound } from "../../lib/not-found-error";
import { ServiceAccount } from "../../types/service-accounts";
import { apiPaths, createApiPath } from "../api";

export type ServiceAccountDetailsOverview = {
	serviceAccountId: string;
};

export async function fetchServiceAccountDetail({
	serviceAccountId
}: ServiceAccountDetailsOverview): Promise<ServiceAccount> {
	const url = createApiPath(apiPaths.serviceAccounts.detail(serviceAccountId));

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
			.catch(() => `Failed to fetch service account ${serviceAccountId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
