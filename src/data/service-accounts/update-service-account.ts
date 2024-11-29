import { FetchError } from "@/lib/fetch-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { notFound } from "../../lib/not-found-error";
import { ServiceAccount, UpdateServiceAccount } from "@/types/service-accounts";
import { apiPaths, createApiPath } from "../api";

type UpdateServiceAccountPayload = {
	serviceAccountId: string;
	body: UpdateServiceAccount;
};
export async function updateServiceAccounts({
	body,
	serviceAccountId
}: UpdateServiceAccountPayload): Promise<ServiceAccount> {
	const url = createApiPath(apiPaths.serviceAccounts.detail(serviceAccountId));

	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => {
				if (Array.isArray(data.detail)) {
					return data.detail[1];
				}
				return data.detail;
			})
			.catch(() => `Failed to update service account ${serviceAccountId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useUpdateServiceAccount(
	options?: UseMutationOptions<ServiceAccount, FetchError, UpdateServiceAccountPayload, unknown>
) {
	return useMutation<ServiceAccount, FetchError, UpdateServiceAccountPayload>({
		...options,
		mutationFn: async ({ serviceAccountId, body }) => {
			return updateServiceAccounts({ serviceAccountId, body });
		}
	});
}
