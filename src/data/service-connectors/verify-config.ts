import { FetchError } from "@/lib/fetch-error";
import { ResourcesModel, ServiceConnectorRequest } from "@/types/service-connectors";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type VerifyConnector = {
	payload: ServiceConnectorRequest;
};

export async function fetchVerifyConnector({ payload }: VerifyConnector): Promise<ResourcesModel> {
	const url = createApiPath(apiPaths.serviceConnectors.verify);
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
			.catch(() => `Failed to verify connector`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useVerifyConnectorConfig(
	options?: UseMutationOptions<ResourcesModel, FetchError, VerifyConnector>
) {
	return useMutation<ResourcesModel, FetchError, VerifyConnector>({
		...options,
		mutationFn: async ({ payload }: VerifyConnector) => {
			return fetchVerifyConnector({ payload });
		}
	});
}
