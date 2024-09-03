import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { Secret } from "@/types/secret";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function fetchSecretDetail(secretId: string): Promise<Secret> {
	const url = createApiPath(apiPaths.secrets.detail(secretId));
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
			.catch(() => `Failed to fetch secret ${secretId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
