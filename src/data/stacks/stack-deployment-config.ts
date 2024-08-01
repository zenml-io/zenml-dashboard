import { StackDeploymentConfigQueryParams, StackDeploymentConfig } from "@/types/stack";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
import { objectToSearchParams } from "@/lib/url";

export async function fetchStackDeploymentConfig(
	queryParams: StackDeploymentConfigQueryParams
): Promise<StackDeploymentConfig> {
	const url =
		createApiPath(apiPaths.stackDeployment.config) +
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
			.catch(() => "Error while fetching stack deployment config");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
