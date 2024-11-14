import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";

export async function deleteServiceAccount(serviceAccountId: string) {
	const url = createApiPath(apiPaths.serviceAccounts.detail(serviceAccountId));
	const res = await fetcher(url, {
		method: "DELETE",
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
			.catch(() => `Failed to delete service account ${serviceAccountId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}
	return res.json();
}

export function useDeleteServiceAccount(options?: UseMutationOptions<void, unknown, string>) {
	return useMutation<void, unknown, string>({
		...options,
		mutationFn: async (serviceAccountId) => {
			await deleteServiceAccount(serviceAccountId);
		}
	});
}
