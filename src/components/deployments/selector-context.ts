import { createDataTableConsumerContext } from "@/components/tables/helper";

export const {
	Context: DeploymentSelectorContext,
	ContextProvider: DeploymentSelectorContextProvider,
	useContext: useDeploymentSelectorContext
} = createDataTableConsumerContext();

// export function useSnapshotBulkDelete() {
// 	const { setRowSelection } = useSnapshotSelectorContext();

// 	const { mutateAsync } = useUpdateSnapshot();

// 	async function handleDelete(id: string) {
// 		await mutateAsync({ snapshotId: id, payload: { name: false } });
// 	}

// 	return useBulkDelete({
// 		deleteFn: handleDelete,
// 		queryKeyToInvalidate: pipelineSnapshotQueries.all,
// 		setRowSelection
// 	});
// }
