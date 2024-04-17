import { FetchError } from "@/lib/fetch-error";
import { createApiPath, apiPaths } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { StackComponent } from "@/types/components";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";

type ComponentDetail = {
	componentId: string;
};

export function getComponentDetailQueryKey({ componentId }: ComponentDetail) {
	return ["components", componentId];
}

export async function fetchComponentDetail({ componentId }: ComponentDetail) {
	const url = createApiPath(apiPaths.components.detail(componentId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
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
