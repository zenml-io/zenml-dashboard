import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "@zenml-io/react-component-library";
import SlashCircle from "@/assets/icons/slash-circle.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";

export default function MembersDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<DotsIcon className="h-4 w-4 fill-theme-text-tertiary" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem icon={<Edit />}>Update Credentials</DropdownMenuItem>
				<DropdownMenuItem icon={<SlashCircle fill="red" />}>Remove Member</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
