import { FetchError } from "@/lib/fetch-error";
import { ServiceConnector, ServiceConnectorRequest } from "@/types/service-connectors";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type ServiceConnectorCreation = {
	body: ServiceConnectorRequest;
};

export async function createServiceConnector({
	body
}: ServiceConnectorCreation): Promise<ServiceConnector> {
	const url = createApiPath(apiPaths.serviceConnectors.list);
	const res = await fetcher(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
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
			.catch(() => `Failed to create service connector`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateServiceConnector(
	options?: UseMutationOptions<ServiceConnector, FetchError, ServiceConnectorCreation>
) {
	return useMutation<ServiceConnector, FetchError, ServiceConnectorCreation>({
		...options,
		mutationFn: async ({ body }) => {
			return createServiceConnector({ body });
		}
	});
}
