import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import {
	AlertDialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { ElementRef, useRef, useState } from "react";
import { DeleteKeyAlert } from "./DeleteKeyAlert";

export default function SecretTableDropDown({
	secretId,
	keyName
}: {
	secretId: string;
	keyName: string;
}) {
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
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete "
					icon={<DeleteIcon />}
				>
					<DeleteKeyAlert secretId={secretId} keyName={keyName}></DeleteKeyAlert>
				</AlertDialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
