import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteRunAlert } from "./DeleteRunAlert";

export function RunActionsMenu() {
	const [deleteOpen, setDeleteOpen] = useState(false);

	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<>
			<DeleteRunAlert setOpen={setDeleteOpen} open={deleteOpen} />
			<DropdownMenu modal={dropdownOpen} open={dropdownOpen} onOpenChange={setDropdownOpen}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							intent="secondary"
							className="flex aspect-square items-center justify-center p-0"
							emphasis="minimal"
							size="md"
						>
							<HorizontalDots className="h-5 w-5 shrink-0 fill-theme-text-secondary" />
							<p className="sr-only">Run Actions</p>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
						<DropdownMenuItem onClick={() => setDeleteOpen(true)} className="space-x-2">
							<Trash className="h-3 w-3 fill-neutral-400" />
							<p>Delete</p>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</DropdownMenu>
		</>
	);
}
