import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import {
	Button,
	Dialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteSecretAlert } from "./DeleteSecretAlert";
import { EditSecretDialog } from "./EditSecretDialog";

export default function SecretsDropdown({ secretId }: { secretId: string }) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	return (
		<>
			<DeleteSecretAlert
				secretId={secretId}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
				<EditSecretDialog
					secretId={secretId}
					isSecretNameEditable={true}
					dialogTitle="Edit secret"
				/>
			</Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						intent="secondary"
						emphasis="minimal"
						className="flex aspect-square items-center justify-center p-0"
					>
						<DotsIcon className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem
						onSelect={() => setEditDialogOpen(true)}
						className="cursor-pointer space-x-2"
					>
						<EditIcon className="h-3 w-3 fill-neutral-400" />
						<p>Edit</p>
					</DropdownMenuItem>
					<DropdownMenuItem
						onSelect={() => setDeleteDialogOpen(true)}
						className="cursor-pointer space-x-2"
					>
						<Trash className="h-3 w-3 fill-neutral-400" />
						<p>Delete</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
