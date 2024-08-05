import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateSecret } from "@/types/secret";

export async function updateSecret(secretId: string, body: UpdateSecret) {
	const url = createApiPath(apiPaths.secrets.detail(secretId));
	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error updating secret",
			status: res.status,
			statusText: res.statusText
		});
	}

	return res.json();
}

export function useUpdateSecret(
	options?: Omit<
		UseMutationOptions<unknown, FetchError, { id: string; body: UpdateSecret }, unknown>,
		"mutationFn"
	>
) {
	return useMutation<unknown, FetchError, { id: string; body: UpdateSecret }>({
		mutationFn: async ({ id, body }) => {
			return updateSecret(id, body);
		},
		...options
	});
}
