import { ButtonGroupBasic } from "@/components/button-group/button-group-basic";
import { useDeploymentSelectorContext } from "@/components/deployments/selector-context";

export function PipelineDeploymentsButtonGroup() {
	const { selectedRowCount } = useDeploymentSelectorContext();
	// const { bulkDelete } = useSnapshotBulkDelete();

	async function handleBulkDeleteSelected() {
		// await bulkDelete(selectedRowIDs);
	}

	return (
		<ButtonGroupBasic
			itemName="Pipeline Snapshot"
			selectedItemCount={selectedRowCount}
			onDeleteSelected={handleBulkDeleteSelected}
		/>
	);
}
