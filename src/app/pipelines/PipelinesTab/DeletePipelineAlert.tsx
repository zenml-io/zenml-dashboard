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
			<DeleteAlertContent
				title={`Delete Pipeline${selectedRowCount >= 2 ? "s" : ""}`}
				handleDelete={handleDelete}
			>
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
