import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { pluralize } from "@/lib/strings";
import {
	AlertDialog,
	AlertDialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useServiceAccountBulkDelete, useServiceAccountSelectorContext } from "./SelectorContext";

export function DeleteServiceAccountAlert() {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedRowCount, selectedRowIDs } = useServiceAccountSelectorContext();
	const { bulkDelete } = useServiceAccountBulkDelete();

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
				title={`Delete ${pluralize(selectedRowCount, "Service Account")}`}
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
