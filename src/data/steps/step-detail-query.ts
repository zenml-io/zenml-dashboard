import { FetchError } from "@/lib/fetch-error";
import { apiPaths, createApiPath } from "../api";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Step } from "@/types/steps";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";

type StepDetail = {
	stepId: string;
};

export function getStepDetailQueryKey({ stepId }: StepDetail) {
	return ["steps", stepId];
}

export async function fetchStepDetail({ stepId }: StepDetail) {
	const url = createApiPath(apiPaths.steps.detail(stepId));
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
			message: `Error while fetching step ${stepId}`,
			status: res.status,
			statusText: res.statusText
		});
	}
	return res.json();
}

export function useStepDetail(
	params: StepDetail,
	options?: Omit<UseQueryOptions<Step, FetchError>, "queryKey" | "queryFn">
) {
	return useQuery<Step, FetchError>({
		queryKey: getStepDetailQueryKey(params),
		queryFn: () => fetchStepDetail(params),
		...options
	});
}
