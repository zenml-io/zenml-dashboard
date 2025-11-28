import DeleteIcon from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import {
	AlertDialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { useServiceAccountBulkDelete } from "./SelectorContext";

export default function ServiceAccountsDropdown({
	serviceAccountId
}: {
	serviceAccountId: string;
}) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const { bulkDelete } = useServiceAccountBulkDelete();

	async function handleDelete() {
		await bulkDelete([serviceAccountId]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DeleteAlertContent title="Delete Service Account" handleDelete={handleDelete}>
					<DeleteAlertContentBody>
						<p>Are you sure?</p>
						<p>This action cannot be undone.</p>
					</DeleteAlertContentBody>
				</DeleteAlertContent>
			</AlertDialog>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open service account actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)} icon={<DeleteIcon />}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
