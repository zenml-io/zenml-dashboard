import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { apiPaths, createApiPath } from "../api";
import { notFound } from "@/lib/not-found-error";
import { StackComponent } from "@/types/components";

export type StackComponentDetailArgs = {
	params: { component_id: string };
};

export function getStackComponentDetailQueryKey({ params }: StackComponentDetailArgs) {
	return ["stacks-components", params];
}

export async function fetchStackComponent({ params }: StackComponentDetailArgs, token?: string) {
	const url = createApiPath(
		apiPaths.components.detail(params.component_id) + "?" + objectToSearchParams(params)
	);
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
			message: `Error while fetching component ${params.component_id}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useStackComponent(
	params: StackComponentDetailArgs,
	options?: Omit<UseQueryOptions<StackComponent, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<StackComponent, FetchError>({
		queryKey: getStackComponentDetailQueryKey(params),
		queryFn: () => fetchStackComponent(params),
		...options
	});
}
