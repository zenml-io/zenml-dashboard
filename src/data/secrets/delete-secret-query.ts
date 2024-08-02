import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export async function deleteSecret(secretId: string) {
	const url = createApiPath(apiPaths.secrets.detail(secretId));
	const res = await fetcher(url, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error deleting secret",
			status: res.status,
			statusText: res.statusText
		});
	}

	return res.json();
}

export function useDeleteSecret(
	options?: Omit<UseMutationOptions<string, unknown, string>, "mutationFn">
) {
	return useMutation<string, unknown, string>({
		mutationFn: async (id) => {
			return deleteSecret(id);
		},
		...options
	});
}
