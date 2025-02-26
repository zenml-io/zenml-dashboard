import { Flavor } from "@/types/flavors";
import { fetcher } from "../fetch";
import { apiPaths, createApiPath } from "../api";
import { notFound } from "@/lib/not-found-error";
import { FetchError } from "@/lib/fetch-error";

export async function fetchFlavorDetail(flavorId: string): Promise<Flavor> {
	const url = createApiPath(apiPaths.flavors.detail(flavorId));

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
			.catch(() => `Error while fetching flavor ${flavorId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
