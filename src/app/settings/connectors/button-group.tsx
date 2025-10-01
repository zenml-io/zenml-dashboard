import Trash from "@/assets/icons/trash.svg?react";
import { DeleteConnectorAlertBody } from "@/components/service-connectors/delete-connector";
import { pluralize } from "@/lib/strings";
import {
	AlertDialog,
	AlertDialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useConnectorBulkDelete, useConnectorSelectorContext } from "./selector-context";
export function ConnectorButtonGroup() {
	const { selectedRowCount, selectedRowIDs } = useConnectorSelectorContext();
	const { bulkDelete } = useConnectorBulkDelete();

	async function handleBulkDeleteSelected() {
		await bulkDelete(selectedRowIDs);
	}

	const plural = pluralize(selectedRowCount, "Service connector");
	const info = `${selectedRowCount} ${plural} selected`;

	return (
		<div className="flex h-7 items-center divide-x divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate">
			<div className="bg-primary-25 px-2 py-1 font-semibold text-theme-text-brand">{info}</div>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						className="rounded-sharp border-y-0 bg-white"
						size="md"
						emphasis="subtle"
						intent="secondary"
					>
						<Trash className="h-5 w-5 shrink-0 gap-1 fill-neutral-400" />
						Delete
					</Button>
				</AlertDialogTrigger>
				<DeleteConnectorAlertBody deleteHandler={handleBulkDeleteSelected} />
			</AlertDialog>
		</div>
	);
}
