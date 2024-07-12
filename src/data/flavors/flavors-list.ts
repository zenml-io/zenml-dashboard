import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { fetcher } from "../fetch";
import { apiPaths, createApiPath } from "../api";
import { FlavorListQueryParams, FlavorsPage } from "@/types/flavors";
import { notFound } from "@/lib/not-found-error";

export async function fetchFlavors(queryParams: FlavorListQueryParams): Promise<FlavorsPage> {
	const url =
		createApiPath(apiPaths.flavors.all) +
		(queryParams ? `?${objectToSearchParams(queryParams)}` : "");
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
			.catch(() => "Error while fetching flavors");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
