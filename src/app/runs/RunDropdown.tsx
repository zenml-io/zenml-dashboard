import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialog,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { useRunBulkDelete } from "./RunsSelectorContext";

type Props = {
	id: string;
};

export function RunDropdown({ id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { bulkDelete } = useRunBulkDelete();

	async function handleDelete() {
		await bulkDelete([id]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DeleteAlertContent title="Delete Run" handleDelete={handleDelete}>
					<DeleteAlertContentBody>
						<p>Are you sure?</p>
						<p>This action cannot be undone.</p>
					</DeleteAlertContentBody>
				</DeleteAlertContent>
			</AlertDialog>

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
					<DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)} icon={<Trash />}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
