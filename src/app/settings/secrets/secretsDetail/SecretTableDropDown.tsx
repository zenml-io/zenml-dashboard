import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	AlertDialogTrigger
} from "@zenml-io/react-component-library";

import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import { ElementRef, useRef, useState } from "react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { DeleteKeyAlert } from "./DeleteKeyAlert";

export default function SecretTableDropDown({
	secretId,
	keyName
}: {
	secretId: string;
	keyName: string;
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [hasOpenDialog] = useState(false);

	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}
	function handleDialogItemOpenChange() {
		setDeleteDialogOpen(true);
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
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete "
					icon={<DeleteIcon />}
				>
					<DeleteKeyAlert
						isOpen={deleteDialogOpen}
						onClose={() => {
							setDropdownOpen(false);
							setDeleteDialogOpen(false);
						}}
						secretId={secretId}
						keyName={keyName}
					></DeleteKeyAlert>
				</AlertDialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
