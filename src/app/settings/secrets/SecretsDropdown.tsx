import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { DialogItem } from "@/components/dialog/DialogItem";
import {
	AlertDialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { ElementRef, useRef, useState } from "react";
import { DeleteSecretAlert } from "./DeleteSecretAlert";
import { EditSecretDialog } from "./EditSecretDialog";

export default function SecretsDropdown({ secretId }: { secretId: string }) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}

	function handleDialogItemOpenChange(open: boolean) {
		if (open === false) {
			setDropdownOpen(false);
			setTimeout(() => {
				setHasOpenDialog(open);
			}, 200);
			return;
		}
		setHasOpenDialog(open);
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
				<DialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Edit "
					icon={<EditIcon />}
				>
					<EditSecretDialog
						secretId={secretId}
						isSecretNameEditable={true}
						dialogTitle="Edit secret"
					></EditSecretDialog>
				</DialogItem>
				<DialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete "
					icon={<DeleteIcon />}
				>
					<DeleteSecretAlert secretId={secretId}></DeleteSecretAlert>
				</DialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
