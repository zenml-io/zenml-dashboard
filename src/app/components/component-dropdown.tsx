import Edit from "@/assets/icons/edit.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DeleteStackComponentAlert } from "@/components/stack-components/delete-component/delete-alert";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library/components/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useComponentBulkDelete } from "./selector-context";
type Props = {
	id: string;
};

export function ComponentDropdown({ id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const navigate = useNavigate();
	const { bulkDelete } = useComponentBulkDelete();

	async function handleDelete() {
		await bulkDelete([id]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<DeleteStackComponentAlert
				deleteHandler={handleDelete}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open component actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem
						onSelect={() => navigate(routes.components.edit(id))}
						className="cursor-pointer space-x-2"
					>
						<Edit className="h-3 w-3 fill-neutral-400" />
						<p>Edit</p>
					</DropdownMenuItem>
					<DropdownMenuItem
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
