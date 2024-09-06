import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";
import { ListSecretsParams, SecretsPage } from "@/types/secret";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type SecretsOverview = {
	params: ListSecretsParams;
};

export async function fetchAllSecrets({ params }: SecretsOverview): Promise<SecretsPage> {
	const url = createApiPath(apiPaths.secrets.all + "?" + objectToSearchParams(params));
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
			.catch(() => "Failed to fetch secrets");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
