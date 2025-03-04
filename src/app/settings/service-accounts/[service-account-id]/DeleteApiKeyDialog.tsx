import Trash from "@/assets/icons/trash.svg?react";
import {
	AlertDialog,
	AlertDialogTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { useBulkDeleteApiKeys } from "@/data/service-accounts/bulk-delete-api-keys";

type Props = {
	serviceAccountId: string;
	apiKeyIds: string[];
};

export function DeleteApiKey({ serviceAccountId, apiKeyIds }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const { bulkDelete } = useBulkDeleteApiKeys();

	async function handleDelete() {
		await bulkDelete(apiKeyIds, serviceAccountId);
		setIsOpen(false);
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
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
				title={`Delete Api Key${apiKeyIds.length >= 2 ? "s" : ""}`}
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
