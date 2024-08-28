import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	AlertDialogTrigger
} from "@zenml-io/react-component-library";
import SlashCircle from "@/assets/icons/slash-circle.svg?react";
import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import { AlertDialogItem } from "@/components/AlertDialogDropdownItem";
import { DeleteMemberAlert } from "./DeleteMemberAlert";
import { ElementRef, useRef, useState } from "react";

type Props = {
	userId: string;
	name: string;
};
export default function MembersDropdown({ userId, name }: Props) {
	const [hasOpenDialog, setHasOpenDialog] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
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
				{/* <DropdownMenuItem ></DropdownMenuItem> */}
				<AlertDialogItem
					onSelect={handleDialogItemSelect}
					onOpenChange={handleDialogItemOpenChange}
					triggerChildren="Remove Member"
					icon={<SlashCircle fill="red" />}
				>
					<DeleteMemberAlert name={name} userId={userId} />
				</AlertDialogItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
