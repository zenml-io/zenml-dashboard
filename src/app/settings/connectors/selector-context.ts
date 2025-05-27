import { createDataTableConsumerContext } from "@/components/tables/helper";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useDeleteConnector } from "@/data/service-connectors/delete-service-connector";
import { useBulkDelete } from "@/lib/bulk-delete";

export const {
	Context: ConnectorSelectorContext,
	ContextProvider: ConnectorSelectorContextProvider,
	useContext: useConnectorSelectorContext
} = createDataTableConsumerContext();

export function useConnectorBulkDelete() {
	const { setRowSelection } = useConnectorSelectorContext();

	const { mutateAsync } = useDeleteConnector();

	async function handleDelete(id: string) {
		await mutateAsync({ connectorId: id });
	}

	return useBulkDelete({
		deleteFn: handleDelete,
		queryKeyToInvalidate: [...serviceConnectorQueries.connectors],
		setRowSelection
	});
}
