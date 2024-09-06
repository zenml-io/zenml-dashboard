import { FetchError } from "@/lib/fetch-error";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";

export type DeletePipelineArgs = {
	pipelineId: string;
};

export async function deleteRun({ pipelineId }: DeletePipelineArgs) {
	const url = createApiPath(apiPaths.pipelines.detail(pipelineId));

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
			.catch(() => `Failed to delete pipeline ${pipelineId}`);

		throw new FetchError({
			status: res.status,
			statusText: res.statusText,
			message: errorData
		});
	}

	return res.json();
}

export function useDeletePipeline(
	options?: Omit<UseMutationOptions<any, FetchError, DeletePipelineArgs>, "mutationFn">
) {
	return useMutation<any, FetchError, DeletePipelineArgs>({
		mutationFn: deleteRun,
		...options
	});
}
