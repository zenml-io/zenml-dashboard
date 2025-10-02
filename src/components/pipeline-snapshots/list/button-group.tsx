import { ButtonGroupBasic } from "@/components/button-group/button-group-basic";
import {
	useSnapshotBulkDelete,
	useSnapshotSelectorContext
} from "@/components/pipeline-snapshots/selector-context";

export function PipelineSnapshotsButtonGroup() {
	const { selectedRowCount, selectedRowIDs } = useSnapshotSelectorContext();
	const { bulkDelete } = useSnapshotBulkDelete();

	async function handleBulkDeleteSelected() {
		await bulkDelete(selectedRowIDs);
	}

	return (
		<ButtonGroupBasic
			itemName="Pipeline Snapshot"
			selectedItemCount={selectedRowCount}
			onDeleteSelected={handleBulkDeleteSelected}
		/>
	);
}
