import Trash from "@/assets/icons/trash.svg?react";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteKeyAlert } from "./DeleteKeyAlert";

export default function SecretTableDropDown({
	secretId,
	keyName
}: {
	secretId: string;
	keyName: string;
}) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	return (
		<>
			<DeleteKeyAlert
				secretId={secretId}
				keyName={keyName}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open secret key actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem
						onSelect={() => setDeleteDialogOpen(true)}
						className="cursor-pointer space-x-2"
					>
						<Trash className="h-3 w-3 fill-neutral-400" />
						<p>Delete</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
