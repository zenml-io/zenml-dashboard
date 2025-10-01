import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import SlashCircle from "@/assets/icons/slash-circle.svg?react";
import {
	AlertDialog,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeleteMemberAlert } from "./DeleteMemberAlert";

type Props = {
	userId: string;
	name: string;
};
export default function MembersDropdown({ userId, name }: Props) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	return (
		<>
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DeleteMemberAlert name={name} userId={userId} />
			</AlertDialog>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<DotsIcon className="h-4 w-4 fill-theme-text-tertiary" />
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={7}>
					<DropdownMenuItem onSelect={() => setDeleteDialogOpen(true)} icon={<SlashCircle />}>
						Remove Member
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
}
