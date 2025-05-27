import { createApiPath, apiPaths } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetch";

type DeleteConnectorParams = {
	connectorId: string;
};

export async function deleteConnector({ connectorId }: DeleteConnectorParams) {
	const url = createApiPath(apiPaths.serviceConnectors.detail(connectorId));

	const res = await fetcher(url, {
		method: "DELETE"
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
			.catch(() => `Error while deleting connector ${connectorId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useDeleteConnector(
	options?: UseMutationOptions<string, FetchError, DeleteConnectorParams, any>
) {
	return useMutation<string, FetchError, DeleteConnectorParams, unknown>({
		...options,
		mutationFn: async ({ connectorId }: DeleteConnectorParams) => {
			return deleteConnector({ connectorId });
		}
	});
}
