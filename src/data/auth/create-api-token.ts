import { apiPaths, createApiPath } from "@/data/api";
import { FetchError } from "@/lib/fetch-error";
import { ApiTokenQueryParams } from "@/types/auth";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { objectToSearchParams } from "../../lib/url";
import { fetcher } from "../fetch";

type CreateApiToken = {
	params: ApiTokenQueryParams;
};

export async function createAPIToken({ params }: CreateApiToken): Promise<string> {
	const queryString = objectToSearchParams(params).toString();
	const url = createApiPath(apiPaths.apiToken + (queryString ? `?${queryString}` : ""));

	const res = await fetcher(url, {
		credentials: "include",
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
			.catch(() => "Error while creating API Token");
		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useCreateApiToken(
	options?: Omit<UseMutationOptions<string, unknown, CreateApiToken, FetchError>, "mutationFn">
) {
	return useMutation<string, unknown, CreateApiToken, FetchError>({
		mutationFn: async (payload) => {
			return createAPIToken(payload);
		},
		...options
	});
}
