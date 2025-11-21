import Users from "@/assets/icons/users.svg?react";
import { DropdownTriggerButton } from "@/components/dropdown-trigger-button";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

export function NonProjectScopedDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<DropdownTriggerButton>
					<span className="sr-only">Open server actions</span>
				</DropdownTriggerButton>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="z-10" align="end" sideOffset={1}>
				<DropdownMenuItem asChild icon={<Users />}>
					<Link className="hover:cursor-pointer" to={routes.settings.members}>
						Manage Members
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
