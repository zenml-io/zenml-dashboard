import { useDeletePipeline } from "../../../data/pipelines/delete-pipeline";
import { usePipelineDataTableContext } from "./PipelineSelectorContext";
import { createUseBulkDelete } from "@/lib/bulk-delete";
import { pipelineQueries } from "../../../data/pipelines";

export const useBulkDeletePipelines = createUseBulkDelete({
	useMutation: useDeletePipeline,
	useQueryKeys: () => pipelineQueries,
	useDataTableContext: usePipelineDataTableContext,
	getParams: (pipelineId) => ({ pipelineId })
});
