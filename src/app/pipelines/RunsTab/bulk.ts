import { createUseBulkDelete } from "@/lib/bulk-delete";
import { useDeleteRun } from "@/data/pipeline-runs/delete-run";
import { pipelineQueries } from "@/data/pipelines";
import { useRunsDataTableContext } from "./RunsDataTableContext";

export const useBulkDeleteRuns = createUseBulkDelete({
	useMutation: useDeleteRun,
	useQueryKeys: () => pipelineQueries,
	useDataTableContext: useRunsDataTableContext,
	getParams: (runId) => ({ runId })
});
