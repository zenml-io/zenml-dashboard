import { StackList, StackListQueryParams } from "@/types/stack";
import { FetchError } from "../../lib/fetch-error";
import { notFound } from "../../lib/not-found-error";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";
import { objectToSearchParams } from "@/lib/url";

export async function fetchStacks(queryParams: StackListQueryParams): Promise<StackList> {
	const url =
		createApiPath(apiPaths.stacks.all) +
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
			.catch(() => "Error while fetching stacks");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
