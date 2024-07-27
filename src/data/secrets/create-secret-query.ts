import { apiPaths, createApiPath } from "@/data/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FetchError } from "../../lib/fetch-error";
import { fetcher } from "../fetch";
import { Secret, CreateSecret } from "@/types/secret";

export async function createSecret(body: CreateSecret) {
	const url = createApiPath(apiPaths.secrets.add(body.workspace));

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
			.then((data) => data.detail)
			.catch(() => "Failed to create Secret");

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateSecretMutation(
	options?: Omit<UseMutationOptions<Secret, unknown, CreateSecret>, "mutationFn">
) {
	return useMutation<Secret, unknown, CreateSecret>({
		mutationFn: async (payload) => {
			return createSecret(payload);
		},
		...options
	});
}
