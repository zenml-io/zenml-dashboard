import { objectToSearchParams } from "@/lib/url";
import { StackDeploymentStack, StackDeploymentStackQueryParams } from "@/types/stack";
import { FetchError } from "../../lib/fetch-error";
import { notFound } from "../../lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function fetchStackDeploymentStack(
	queryParams: StackDeploymentStackQueryParams
): Promise<StackDeploymentStack> {
	const url =
		createApiPath(apiPaths.stackDeployment.stack) +
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
			.catch(() => "Error while fetching the deployed stack");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
