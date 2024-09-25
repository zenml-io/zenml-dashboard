import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { AlertDialog, AlertDialogTrigger, Button } from "@zenml-io/react-component-library";
import { useState } from "react";
import { useRunsSelectorContext } from "./RunsSelectorContext";

export function DeleteRunAlert() {
	const [isOpen, setIsOpen] = useState(false);
	const { bulkDeleteRuns, selectedRuns } = useRunsSelectorContext();

	async function handleDelete() {
		await bulkDeleteRuns(selectedRuns);
		setIsOpen(false);
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger>
				<Button
					className="rounded-sharp border-none bg-white"
					size="md"
					emphasis="subtle"
					intent="secondary"
				>
					<Trash className="h-5 w-5 shrink-0 gap-1 fill-neutral-400" />
					Delete
				</Button>
			</AlertDialogTrigger>
			<DeleteAlertContent
				title={`Delete Run${selectedRuns.length >= 2 ? "s" : ""}`}
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
