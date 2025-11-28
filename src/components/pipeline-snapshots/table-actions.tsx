import Trash from "@/assets/icons/trash.svg?react";
import { DeletePipelineSnapshotAlert } from "@/components/pipeline-snapshots/delete-alert";
import { useSnapshotBulkDelete } from "@/components/pipeline-snapshots/selector-context";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library/components/client";
import { useState } from "react";

type Props = {
	snapshotId: string;
};

export function PipelineSnapshotActions({ snapshotId }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const { bulkDelete } = useSnapshotBulkDelete();

	async function handleDelete() {
		await bulkDelete([snapshotId]);
		setDeleteDialogOpen(false);
	}

	return (
		<>
			<DeletePipelineSnapshotAlert
				deleteHandler={handleDelete}
				open={deleteDialogOpen}
				setOpen={setDeleteDialogOpen}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton>
						<span className="sr-only">Open pipeline snapshot actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
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
