import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	AlertDialogTrigger
} from "@zenml-io/react-component-library";
import EditIcon from "@/assets/icons/edit-icon.svg?react";
import DeleteIcon from "@/assets/icons/icon-trash.svg?react";

import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import { ElementRef, useRef, useState } from "react";
import { DeleteSecretAlert } from "./DeleteSecretAlert";
import { EditSecretDialog } from "./EditSecretDialog";

export default function SecretsDropdown({ secretId }: { secretId: string }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}

	function handleDialogItemOpenChange(open: boolean) {
		setDeleteDialogOpen(true);
	}

	function handleEditDialogOpenChange(open: boolean) {
		setEditDialogOpen(open);
	}

	return (
		<DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
			<DropdownMenuTrigger ref={dropdownTriggerRef}>
				<DotsIcon className="h-4 w-4 fill-theme-text-tertiary" />
			</DropdownMenuTrigger>
			<DropdownMenuContent
				hidden={hasOpenDialog}
				onCloseAutoFocus={(event) => {
					if (focusRef.current) {
						focusRef.current.focus();
						focusRef.current = null;
						event.preventDefault();
					}
				}}
				align="end"
				sideOffset={7}
			>
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleEditDialogOpenChange}
					triggerChildren="Edit "
					icon={<EditIcon fill="red" />}
				>
					<EditSecretDialog
						secretId={secretId}
						isOpen={editDialogOpen}
						onClose={() => {
							setDropdownOpen(false);
							setEditDialogOpen(false);
						}}
					></EditSecretDialog>
				</AlertDialogItem>
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete "
					icon={<DeleteIcon fill="red" />}
				>
					<DeleteSecretAlert
						isOpen={deleteDialogOpen}
						onClose={() => {
							setDropdownOpen(false);
							setDeleteDialogOpen(false);
						}}
						secretId={secretId}
					></DeleteSecretAlert>
				</AlertDialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
