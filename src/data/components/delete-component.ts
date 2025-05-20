import { createApiPath, apiPaths } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetcher } from "../fetch";

type DeleteComponentParams = {
	componentId: string;
};

export async function deleteComponent({ componentId }: DeleteComponentParams) {
	const url = createApiPath(apiPaths.components.detail(componentId));

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
			.catch(() => `Error while deleting component ${componentId}`);
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useDeleteComponent(
	options?: UseMutationOptions<string, FetchError, DeleteComponentParams, any>
) {
	return useMutation<string, FetchError, DeleteComponentParams, unknown>({
		...options,
		mutationFn: async ({ componentId }: DeleteComponentParams) => {
			return deleteComponent({ componentId });
		}
	});
}
