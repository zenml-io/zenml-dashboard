import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { fetcher } from "../fetch";
import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { CreateServiceAccount, ServiceAccount } from "../../types/service-accounts";

type ServiceAccountOverview = {
	body: CreateServiceAccount;
};

export async function createServiceAccount({
	body
}: ServiceAccountOverview): Promise<ServiceAccount> {
	const url = createApiPath(apiPaths.serviceAccounts.all);
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
			.catch(() => `Failed to create service account`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateServiceAccount(
	options?: UseMutationOptions<ServiceAccount, unknown, CreateServiceAccount>
) {
	return useMutation<ServiceAccount, unknown, CreateServiceAccount>({
		...options,
		mutationFn: async (payload) => {
			return createServiceAccount({ body: payload });
		}
	});
}
