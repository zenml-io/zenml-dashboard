import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { FetchError } from "@/lib/fetch-error";
import { Stack } from "@/types/stack";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
export type StackDetailArgs = {
	stackId: string;
};

export function getPipelineRunDetailQueryKey({ stackId }: StackDetailArgs) {
	return ["stacks", stackId];
}

export async function fetchStack({ stackId }: StackDetailArgs) {
	const url = createApiPath(apiPaths.stacks.detail(stackId));
	const res = await fetcher(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: `Error while fetching stack ${stackId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useStack(
	params: StackDetailArgs,
	options?: Omit<UseQueryOptions<Stack, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<Stack, FetchError>({
		queryKey: getPipelineRunDetailQueryKey(params),
		queryFn: () => fetchStack(params),
		...options
	});
}
