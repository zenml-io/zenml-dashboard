import { FetchError } from "@/lib/fetch-error";
import { ResourcesModel } from "@/types/service-connectors";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

type VerifyConnector = {
	connectorId: string;
};

export async function fetchVerifyConnector({
	connectorId
}: VerifyConnector): Promise<ResourcesModel> {
	const url = createApiPath(apiPaths.serviceConnectors.verifyExisting(connectorId));
	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		}
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

export function useVerifyExistingConnector(
	options?: UseMutationOptions<ResourcesModel, FetchError, VerifyConnector>
) {
	return useMutation<ResourcesModel, FetchError, VerifyConnector>({
		...options,
		mutationFn: async ({ connectorId }: VerifyConnector) => {
			return fetchVerifyConnector({ connectorId });
		}
	});
}
