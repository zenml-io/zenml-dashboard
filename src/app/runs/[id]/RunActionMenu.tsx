import Trash from "@/assets/icons/trash.svg?react";
import Plus from "@/assets/icons/plus.svg?react";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteRunAlert } from "./DeleteRunAlert";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";

type Props = {
	runId: string;
};

export function RunActionsMenu({ runId }: Props) {
	const [deleteOpen, setDeleteOpen] = useState(false);

	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<>
			<DeleteRunAlert setOpen={setDeleteOpen} open={deleteOpen} />
			<DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
				<DropdownMenuTrigger asChild>
					<DropdownTriggerButton size="sm">
						<span className="sr-only">Open run actions</span>
					</DropdownTriggerButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
					<DropdownMenuItem asChild className="space-x-2">
						<Link to={routes.projects.runs.createSnapshot(runId)}>
							<Plus className="h-3 w-3 fill-neutral-400" />
							<p>New Snapshot</p>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setDeleteOpen(true)} className="space-x-2">
						<Trash className="h-3 w-3 fill-neutral-400" />
						<p>Delete</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
