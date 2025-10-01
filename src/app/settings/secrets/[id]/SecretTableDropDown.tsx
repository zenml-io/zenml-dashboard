import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import {
	Button,
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
					<Button
						intent="secondary"
						emphasis="minimal"
						className="flex aspect-square items-center justify-center p-0"
					>
						<DotsIcon className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
					</Button>
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
