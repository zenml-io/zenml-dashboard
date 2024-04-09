import { FetchError } from "@/lib/fetch-error";
import { createApiPath, apiPaths } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { StackComponent } from "@/types/components";
import { notFound } from "@/lib/not-found-error";

type ComponentDetail = {
	componentId: string;
};

export function getComponentDetailQueryKey({ componentId }: ComponentDetail) {
	return ["components", componentId];
}

export async function fetchComponentDetail({ componentId }: ComponentDetail, token?: string) {
	const url = createApiPath(apiPaths.components.detail(componentId));
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` })
		}
	});

	if (res.status === 404) {
		notFound();
	}

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching component ${componentId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useComponentDetail(
	params: ComponentDetail,
	options?: Omit<UseQueryOptions<StackComponent, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<StackComponent, FetchError>({
		queryKey: getComponentDetailQueryKey(params),
		queryFn: () => fetchComponentDetail(params),
		...options
	});
}
