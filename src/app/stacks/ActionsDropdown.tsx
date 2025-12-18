import Edit from "@/assets/icons/edit.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteStackAlert } from "./DeleteStackModal";
import { useDeleteStack } from "./useDeleteStack";

type Props = { id: string };
export function StackActionsMenu({ id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { handleDelete, deleteStack } = useDeleteStack(id, () => setDeleteDialogOpen(false));

	return (
		<>
			<DeleteStackAlert
				deleteHandler={handleDelete}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open stack actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
					<DropdownMenuItem asChild className="cursor-pointer space-x-2">
						<Link to={routes.stacks.edit(id)}>
							<Edit className="h-3 w-3 fill-neutral-400" />
							<p>Edit</p>
						</Link>
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
		</>
	);
}
