import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export async function getWorkSpaceDetail(workspaceName: string) {
	const url = createApiPath(apiPaths.workspaces.detail(workspaceName));
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

export function useGetWorkSpaceDetail(
	workspaceName: string,
	options?: Omit<UseQueryOptions<any, unknown, any>, "queryFn" | "queryKey">
) {
	return useQuery<any, unknown, any>({
		queryFn: () => getWorkSpaceDetail(workspaceName),
		queryKey: ["workspaceDetail", workspaceName],
		...options
	});
}
