import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Trash from "@/assets/icons/trash.svg?react";
import { DeleteAlertContent, DeleteAlertContentBody } from "@/components/DeleteAlertDialog";
import {
	AlertDialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { usePipelineBulkDelete } from "./PipelineSelectorContext";

type Props = {
	id: string;
};
export function PipelineDropdown({ id }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { bulkDelete } = usePipelineBulkDelete();

	async function handleDelete() {
		await bulkDelete([id]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DeleteAlertContent title="Delete Pipeline" handleDelete={handleDelete}>
					<DeleteAlertContentBody>
						<p>Are you sure?</p>
						<p>This action cannot be undone.</p>
					</DeleteAlertContentBody>
				</DeleteAlertContent>
			</AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<DotsIcon className="h-4 w-4 fill-theme-text-tertiary" />
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
