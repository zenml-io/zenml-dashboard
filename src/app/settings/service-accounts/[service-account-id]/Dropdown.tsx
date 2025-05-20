import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Rotate from "@/assets/icons/refresh.svg?react";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { ElementRef, useRef, useState } from "react";
import { RotateApiKeyDialog } from "./RotateKeyDialog";
import { useApiKeyBulkDelete } from "./SelectorContext";

export default function ApiKeyDropdown({
	serviceAccountId,
	apiKeyId
}: {
	serviceAccountId: string;
	apiKeyId: string;
}) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [isRotateDialogOpen, setRotateDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);
	const { bulkDelete } = useApiKeyBulkDelete(serviceAccountId);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}

	function handleDeleteDialogOpenChange(open: boolean) {
		setDeleteDialogOpen(open);
		if (!open) {
			setDropdownOpen(false);
		}
	}

	async function handleDelete() {
		await bulkDelete([apiKeyId]);
		handleDeleteDialogOpenChange(false);
	}

	return (
		<>
			<RotateApiKeyDialog
				setOpen={setRotateDialogOpen}
				open={isRotateDialogOpen}
				serviceAccountId={serviceAccountId}
				apiKeyId={apiKeyId}
			/>
			<DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
				<DropdownMenuTrigger ref={dropdownTriggerRef}>
					<HorizontalDots className="h-5 w-5 fill-theme-text-secondary" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					hidden={isDeleteDialogOpen}
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
					<DropdownMenuItem
						className="px-3"
						onClick={() => setRotateDialogOpen(true)}
						icon={<Rotate />}
					>
						<span>Rotate</span>
					</DropdownMenuItem>

					<AlertDialogItem
						onSelect={handleDialogItemSelect}
						open={isDeleteDialogOpen}
						onOpenChange={handleDeleteDialogOpenChange}
						triggerChildren="Delete"
						icon={<DeleteIcon fill="red" />}
					>
						<DeleteAlertContent title="Delete API Key" handleDelete={handleDelete}>
							<DeleteAlertContentBody>
								<p>Are you sure?</p>
								<p>This action cannot be undone.</p>
							</DeleteAlertContentBody>
						</DeleteAlertContent>
					</AlertDialogItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
