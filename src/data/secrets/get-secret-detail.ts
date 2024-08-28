import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { Secret } from "@/types/secret";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export async function getSecretDetail(secretId: string) {
	const url = createApiPath(apiPaths.secrets.detail(secretId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error fetching secret details",
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useGetSecretDetail(
	secretId: string,
	options?: Omit<UseQueryOptions<Secret, FetchError>, "queryFn" | "queryKey">
) {
	return useQuery<Secret, FetchError>({
		queryFn: () => getSecretDetail(secretId),
		queryKey: ["secrets", secretId],
		...options
	});
}
