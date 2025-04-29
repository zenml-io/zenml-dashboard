import { FetchError } from "@/lib/fetch-error";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { fetchPipelineRun } from "./pipeline-run-detail-query";
import { PipelineRun } from "@/types/pipeline-runs";
type UpdateRunParams = {
	runId: string;
};

export function useFetchOrchestratorPipelineRun(
	options?: UseMutationOptions<PipelineRun, FetchError, UpdateRunParams, unknown>
) {
	return useMutation<PipelineRun, FetchError, UpdateRunParams, unknown>({
		...options,
		mutationFn: async ({ runId }: UpdateRunParams) => {
			return fetchPipelineRun({ runId, queryParams: { refresh_status: true } });
		}
	});
}
