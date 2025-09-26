import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialog,
	AlertDialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";

export type DeleteSelectedItemsAlertProps = {
	itemName: string;
	selectedItemCount: number;
	onDeleteSelected: () => void | Promise<void>;
};

export function DeleteSelectedItemsAlert({
	itemName,
	selectedItemCount,
	onDeleteSelected
}: DeleteSelectedItemsAlertProps) {
	const [isOpen, setIsOpen] = useState(false);

	async function handleDelete() {
		await onDeleteSelected();
		setIsOpen(false);
	}

	const plural = selectedItemCount > 1 ? "s" : "";
	const title = `Delete ${itemName}${plural}`;

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
				<DeleteAlertContentBody>
					<p>Are you sure?</p>
					<p>This action cannot be undone.</p>
				</DeleteAlertContentBody>
			</DeleteAlertContent>
		</AlertDialog>
	);
}
