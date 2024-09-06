import { FetchError } from "@/lib/fetch-error";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";

export type PipelineOverview = {
	runId: string;
};

export async function deleteRun({ runId }: PipelineOverview) {
	const url = createApiPath(apiPaths.runs.detail(runId));

	const res = await fetch(url, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"Content-Type": "application/json"
		}
	});

	if (!res.ok) {
		const errorData: string = await res
			.json()
			.then((data) => data.detail)
			.catch(() => `Failed to delete run ${runId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useDeleteRun(
	options?: Omit<UseMutationOptions<any, FetchError, PipelineOverview>, "mutationFn">
) {
	return useMutation<any, FetchError, PipelineOverview>({
		mutationFn: deleteRun,
		...options
	});
}
