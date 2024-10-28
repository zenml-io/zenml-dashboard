import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { StackComponent } from "@/types/components";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function fetchComponentDetail(componentId: string): Promise<StackComponent> {
	const url = createApiPath(apiPaths.components.detail(componentId));

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
			.catch(() => "Error while fetching stack components");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
