import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	AlertDialogTrigger
} from "@zenml-io/react-component-library";

import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import { ElementRef, useEffect, useRef, useState } from "react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import DeleteIcon from "@/assets/icons/icon-trash.svg?react";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
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
	const { data: secretDetail } = useGetSecretDetail(secretId);

	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}
	function handleDialogItemOpenChange() {
		setDeleteDialogOpen(true);
	}

	useEffect(() => {
		if (secretDetail) {
			// Delete the key-value pair
			const updatedValues = { ...secretDetail.body.values };
			console.log(updatedValues);
			delete updatedValues[keyName];
		}
	}, []);
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
					icon={<DeleteIcon fill="red" />}
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
