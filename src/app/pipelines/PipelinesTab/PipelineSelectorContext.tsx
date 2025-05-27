import { createDataTableConsumerContext } from "@/components/tables/helper";
import { pipelineQueries } from "@/data/pipelines";
import { useDeletePipeline } from "@/data/pipelines/delete-pipeline";

import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: PipelineSelectorContext,
	ContextProvider: PipelineSelectorContextProvider,
	useContext: usePipelineSelectorContext
} = createDataTableConsumerContext();

export function usePipelineBulkDelete() {
	const { setRowSelection } = usePipelineSelectorContext();

	const { mutateAsync } = useDeletePipeline();

	async function handleDelete(id: string) {
		await mutateAsync({ pipelineId: id });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: pipelineQueries.all,
		setRowSelection
	});
}
