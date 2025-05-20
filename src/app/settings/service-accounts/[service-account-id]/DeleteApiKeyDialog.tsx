import Trash from "@/assets/icons/trash.svg?react";
import {
	AlertDialog,
	AlertDialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useApiKeyBulkDelete, useApiKeySelectorContext } from "./SelectorContext";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";

export function DeleteApiKey({ serviceAccountId }: { serviceAccountId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const { bulkDelete } = useApiKeyBulkDelete(serviceAccountId);
	const { selectedRowIDs, selectedRowCount } = useApiKeySelectorContext();
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
				title={`Delete Api Key${selectedRowCount >= 2 ? "s" : ""}`}
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
