import { createDataTableConsumerContext } from "@/components/tables/helper";
import { useDeleteRun } from "@/data/pipeline-runs/delete-run";
import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: RunsSelectorContext,
	ContextProvider: RunsSelectorContextProvider,
	useContext: useRunsSelectorContext
} = createDataTableConsumerContext();

export function useRunBulkDelete() {
	const { setRowSelection } = useRunsSelectorContext();

	const { mutateAsync } = useDeleteRun();

	async function handleDelete(id: string) {
		await mutateAsync({ runId: id });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: ["runs"],
		setRowSelection
	});
}
