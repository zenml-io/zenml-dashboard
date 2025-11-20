import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialog,
	Button,
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
					<Button
						intent="secondary"
						emphasis="minimal"
						className="flex aspect-square items-center justify-center p-0"
					>
						<HorizontalDots className="h-5 w-5 shrink-0 fill-theme-text-secondary" />
					</Button>
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
