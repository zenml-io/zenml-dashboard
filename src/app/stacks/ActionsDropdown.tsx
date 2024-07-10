"use client";

import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DialogItem } from "@/components/dialog/DialogItem";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useRef, useState } from "react";
import { DeleteStackDialog, UpdateStackDialog } from "./DialogItems";

type Props = { name: string };
export function StackActionsMenu({ name }: Props) {
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const dropdownTriggerRef = useRef(null);
	const focusRef = useRef<HTMLElement | null>(null);

	function handleDialogItemSelect() {
		focusRef.current = dropdownTriggerRef.current;
	}

	function handleDialogItemOpenChange(open: boolean) {
		setHasOpenDialog(open);
		if (open === false) {
			setDropdownOpen(false);
		}
	}

	return (
		<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger className="z-10" ref={dropdownTriggerRef}>
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
					className="z-10"
					align="end"
					sideOffset={1}
				>
					<DialogItem
						onSelect={handleDialogItemSelect}
						onOpenChange={handleDialogItemOpenChange}
						icon={<Edit className="h-3 w-3 !fill-neutral-400" />}
						triggerChildren="Update"
					>
						<UpdateStackDialog
							name={name}
							className="lg:min-w-[600px]"
							closeModal={() => handleDialogItemOpenChange(false)}
						/>
					</DialogItem>
					<DialogItem
						onSelect={handleDialogItemSelect}
						onOpenChange={handleDialogItemOpenChange}
						icon={<Trash className="h-3  w-3 !fill-neutral-400" />}
						triggerChildren="Delete"
					>
						<DeleteStackDialog
							name={name}
							className="lg:min-w-[600px]"
							closeModal={() => handleDialogItemOpenChange(false)}
						/>
					</DialogItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</DropdownMenu>
	);
}
