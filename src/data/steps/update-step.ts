import { apiPaths, createApiPath } from "../api";
import { FetchError } from "@/lib/fetch-error";
import { notFound } from "@/lib/not-found-error";
import { fetcher } from "../fetch";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { StepRunUpdate } from "@/types/steps";

export async function updateStep(stepId: string, body: StepRunUpdate) {
	const url = createApiPath(apiPaths.steps.detail(stepId));
	const res = await fetcher(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body)
	});

	if (res.status === 404) notFound();

	if (!res.ok) {
		throw new FetchError({
			message: "Error updating step",
			status: res.status,
			statusText: res.statusText
		});
	}

	return res.json();
}

export function useUpdateStep(
	options?: Omit<
		UseMutationOptions<unknown, FetchError, { id: string; body: StepRunUpdate }, unknown>,
		"mutationFn"
	>
) {
	return useMutation<unknown, FetchError, { id: string; body: StepRunUpdate }>({
		mutationFn: async ({ id, body }) => {
			return updateStep(id, body);
		},
		...options
	});
}
