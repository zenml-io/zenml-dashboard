import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Rotate from "@/assets/icons/refresh.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { RotateApiKeyDialog } from "./RotateKeyDialog";
import { useApiKeyBulkDelete } from "./SelectorContext";

export default function ApiKeyDropdown({
	serviceAccountId,
	apiKeyId
}: {
	serviceAccountId: string;
	apiKeyId: string;
}) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isRotateDialogOpen, setRotateDialogOpen] = useState(false);
	const { bulkDelete } = useApiKeyBulkDelete(serviceAccountId);

	async function handleDelete() {
		await bulkDelete([apiKeyId]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<RotateApiKeyDialog
				setOpen={setRotateDialogOpen}
				open={isRotateDialogOpen}
				serviceAccountId={serviceAccountId}
				apiKeyId={apiKeyId}
			/>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DeleteAlertContent title="Delete API Key" handleDelete={handleDelete}>
					<DeleteAlertContentBody>
						<p>Are you sure?</p>
						<p>This action cannot be undone.</p>
					</DeleteAlertContentBody>
				</DeleteAlertContent>
			</AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<HorizontalDots className="h-5 w-5 fill-theme-text-secondary" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem
						className="px-3"
						onClick={() => setRotateDialogOpen(true)}
						icon={<Rotate />}
					>
						<span>Rotate</span>
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => setDeleteDialogOpen(true)}
						className="px-3"
						icon={<DeleteIcon />}
					>
						<p>Delete</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
