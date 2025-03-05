import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { ElementRef, useRef, useState } from "react";
import { useBulkDeleteServiceAccounts } from "./bulk";

export default function ServiceAccountsDropdown({
	serviceAccountId
}: {
	serviceAccountId: string;
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const { bulkDelete } = useBulkDeleteServiceAccounts();

	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}

	async function handleDelete() {
		await bulkDelete([serviceAccountId]);
		handleDialogItemOpenChange(false);
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
				<HorizontalDots className="h-5 w-5 fill-theme-text-secondary" />
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
				{/* <DropdownMenuItem ></DropdownMenuItem> */}
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					open={hasOpenDialog}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete"
					icon={<DeleteIcon fill="red" />}
				>
					<DeleteAlertContent title="Delete Service Account" handleDelete={handleDelete}>
						<DeleteAlertContentBody>
							<p>Are you sure?</p>
							<p>This action cannot be undone.</p>
						</DeleteAlertContentBody>
					</DeleteAlertContent>
				</AlertDialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
