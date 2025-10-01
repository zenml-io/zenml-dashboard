import Alert from "@/assets/icons/alert-triangle.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { AlertDialog, AlertDialogTrigger, Button } from "@zenml-io/react-component-library";
import { useState } from "react";
import { usePipelineBulkDelete, usePipelineSelectorContext } from "./PipelineSelectorContext";

export function DeletePipelineAlert() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedRowCount, selectedRowIDs } = usePipelineSelectorContext();
	const { bulkDelete } = usePipelineBulkDelete();

	async function handleDelete() {
		await bulkDelete(selectedRowIDs);
		setIsOpen(false);
	}

	const plural = selectedRowCount > 1 ? "s" : "";
	const itemName = `Pipeline${plural}`;
	const title = `Delete ${itemName}`;

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
			<DeleteAlertContent title={title} handleDelete={handleDelete}>
				<DeleteAlertContentBody className="space-y-1">
					<div>
						<p>Are you sure?</p>
						<p>This action cannot be undone.</p>
					</div>

					<div className="space-y-3 rounded-md border border-warning-300 bg-warning-50 px-2 py-1 text-warning-900">
						<div className="flex items-center gap-2 text-text-sm">
							<Alert width={24} height={24} className="shrink-0 fill-warning-700" />
							<p>This will also delete all runs and snapshots associated with the {itemName}.</p>
						</div>
					</div>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
