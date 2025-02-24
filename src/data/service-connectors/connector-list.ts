import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { apiPaths, createApiPath } from "../api";
import { ServiceConnectorList, ServiceConnectorListQueryParams } from "@/types/service-connectors";
import { notFound } from "@/lib/not-found-error";
import { objectToSearchParams } from "@/lib/url";

export async function fetchServiceConnectorList(
	params: ServiceConnectorListQueryParams
): Promise<ServiceConnectorList> {
	const queryParams = objectToSearchParams(params).toString();
	const url = createApiPath(
		apiPaths.serviceConnectors.list + (queryParams ? `?${queryParams}` : "")
	);
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
			.catch(() => "Error while fetching service connector list");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
