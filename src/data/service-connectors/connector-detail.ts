import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { ServiceConnector } from "@/types/service-connectors";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function fetchServiceConnectorDetail(connectorId: string): Promise<ServiceConnector> {
	const url = createApiPath(apiPaths.serviceConnectors.detail(connectorId));
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
			.catch(() => `Error while fetching service connector detail ${connectorId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}
