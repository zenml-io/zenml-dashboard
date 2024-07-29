import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { apiPaths, createApiPath } from "../api";
import { ServiceConnectorInfo, ServiceConnectorResourceInfo } from "@/types/service-connectors";

type ConnectorFullstackResources = {
	payload: ServiceConnectorInfo;
};

export async function fetchConnectorFullstackResources({ payload }: ConnectorFullstackResources) {
	const url = createApiPath(apiPaths.serviceConnectors.fullStackResources);

	const res = await fetcher(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(payload)
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => "Error while fetching service connector type");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useConnectorFullstackResources(
	options?: UseMutationOptions<
		ServiceConnectorResourceInfo,
		FetchError,
		ConnectorFullstackResources,
		any
	>
) {
	return useMutation<
		ServiceConnectorResourceInfo,
		FetchError,
		ConnectorFullstackResources,
		unknown
	>({
		...options,
		mutationFn: async ({ payload }: ConnectorFullstackResources) => {
			return fetchConnectorFullstackResources({ payload });
		}
	});
}
