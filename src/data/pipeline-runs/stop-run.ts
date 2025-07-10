import { FetchError } from "@/lib/fetch-error";
import { objectToSearchParams } from "@/lib/url";
import { PipelineRunStopParams } from "@/types/pipeline-runs";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiPaths, createApiPath } from "../api";
import { fetcher } from "../fetch";

export type StopRunArgs = {
	runId: string;
	params: PipelineRunStopParams;
};

export async function stopRun({ runId, params }: StopRunArgs) {
	const queryString = objectToSearchParams(params).toString();

	const res = await fetcher(
		createApiPath(apiPaths.runs.stop(runId)) + (queryString ? `?${queryString}` : ""),
		{
			method: "POST"
		}
	);

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

export function useStopPipelineRun(
	options?: Omit<UseMutationOptions<any, FetchError, StopRunArgs>, "mutationFn">
) {
	return useMutation<any, FetchError, StopRunArgs>({
		mutationFn: stopRun,
		...options
	});
}
