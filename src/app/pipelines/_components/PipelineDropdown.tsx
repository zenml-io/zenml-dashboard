import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { ElementRef, useRef, useState } from "react";
import { usePipelineBulkDelete } from "./PipelineSelectorContext";

type Props = {
	id: string;
};
export function PipelineDropdown({ id }: Props) {
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownTriggerRef = useRef<ElementRef<typeof AlertDialogTrigger> | null>(null);
	const focusRef = useRef<HTMLElement | null>(null);

	const { bulkDelete } = usePipelineBulkDelete();

	async function handleDelete() {
		await bulkDelete([id]);
		handleDialogItemOpenChange(false);
	}

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
				{/* <DropdownMenuItem ></DropdownMenuItem> */}
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					open={hasOpenDialog}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Delete"
					icon={<Trash fill="red" />}
				>
					<DeleteAlertContent title="Delete Pipeline" handleDelete={handleDelete}>
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
