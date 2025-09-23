import { createDataTableConsumerContext } from "@/components/tables/helper";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useUpdateSnapshot } from "@/data/pipeline-snapshots/update-snapshot";
import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: SnapshotSelectorContext,
	ContextProvider: SnapshotSelectorContextProvider,
	useContext: useSnapshotSelectorContext
} = createDataTableConsumerContext();

export function useSnapshotBulkDelete() {
	const { setRowSelection } = useSnapshotSelectorContext();

	const { mutateAsync } = useUpdateSnapshot();

	async function handleDelete(id: string) {
		await mutateAsync({ snapshotId: id, payload: { name: null } });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: pipelineSnapshotQueries.all,
		setRowSelection
	});
}
