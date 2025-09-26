import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import Edit from "@/assets/icons/edit.svg?react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteStackAlert } from "./DeleteStackModal";
import { UpdateStackDialog } from "./DialogItems";
import { useDeleteStack } from "./useDeleteStack";

type Props = { name: string; id: string };
export function StackActionsMenu({ name, id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

	const { handleDelete, deleteStack } = useDeleteStack(id, () => setDeleteDialogOpen(false));

	return (
		<>
			<UpdateStackDialog name={name} open={updateDialogOpen} setOpen={setUpdateDialogOpen} />
			<DeleteStackAlert
				deleteHandler={handleDelete}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							intent="secondary"
							emphasis="minimal"
							className="flex aspect-square items-center justify-center p-0"
						>
							<HorizontalDots className="h-4 w-4 shrink-0 fill-theme-text-tertiary" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
						<DropdownMenuItem
							onClick={() => setUpdateDialogOpen(true)}
							className="cursor-pointer space-x-2"
						>
							<Edit className="h-3 w-3 fill-neutral-400" />
							<p>Edit</p>
						</DropdownMenuItem>
						<DropdownMenuItem
							disabled={deleteStack.isPending}
							onClick={() => setDeleteDialogOpen(true)}
							className="cursor-pointer space-x-2"
						>
							<Trash className="h-3 w-3 fill-neutral-400" />
							<p>Delete</p>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</DropdownMenu>
		</>
	);
}
