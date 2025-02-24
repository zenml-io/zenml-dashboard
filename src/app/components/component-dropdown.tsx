import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";
import Edit from "@/assets/icons/edit.svg?react";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library/components/client";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useNavigate } from "react-router-dom";

type Props = {
	id: string;
};

export function ComponentDropdown({ id }: Props) {
	const navigate = useNavigate();
	return (
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
				<DropdownMenuItem
					onSelect={() => navigate(routes.components.edit(id))}
					className="cursor-pointer space-x-2"
				>
					<Edit className="h-3 w-3 fill-neutral-400" />
					<p>Edit</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
