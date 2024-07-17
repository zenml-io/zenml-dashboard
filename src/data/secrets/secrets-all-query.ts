import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useQuery } from "@tanstack/react-query";

export async function fetchAllSecrets() {
	const url = createApiPath(apiPaths.secrets.all);
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

export function useAllSecrets() {
	return useQuery({
		queryKey: ["secrets"],
		queryFn: fetchAllSecrets
	});
}
