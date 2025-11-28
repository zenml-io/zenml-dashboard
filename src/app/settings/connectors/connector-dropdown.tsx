import Trash from "@/assets/icons/trash.svg?react";
import { DeleteConnectorAlert } from "@/components/service-connectors/delete-connector";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library/components/client";
import { useState } from "react";
import { useConnectorBulkDelete } from "./selector-context";

type Props = {
	id: string;
};

export function ConnectorDropdown({ id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const { bulkDelete } = useConnectorBulkDelete();

	async function handleDelete() {
		await bulkDelete([id]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<DeleteConnectorAlert
				deleteHandler={handleDelete}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open connector actions</span>
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
