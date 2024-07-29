import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ListSecretsParams, SecretsPage } from "@/types/secret";
import { objectToSearchParams } from "@/lib/url";

type SecretsOverview = {
	params: ListSecretsParams;
};

export function getSecretsQueryKey({ params }: SecretsOverview) {
	return ["secrets", params];
}

export async function fetchAllSecrets({ params }: SecretsOverview) {
	const url = createApiPath(apiPaths.secrets.all + "?" + objectToSearchParams(params));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error while fetching secrets",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

// export function useAllSecrets() {
//   return useQuery({
//     queryKey: ["secrets"],
//     queryFn: fetchAllSecrets,
//   });
// }

export function useAllSecrets(
	params: SecretsOverview,
	options?: Omit<UseQueryOptions<SecretsPage, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<SecretsPage, FetchError>({
		queryKey: getSecretsQueryKey(params),
		queryFn: () => fetchAllSecrets(params),
		...options
	});
}
