import HorizontalDots from "@/assets/icons/dots-horizontal.svg?react";
import Users from "@/assets/icons/users.svg?react";
import { routes } from "@/router/routes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@zenml-io/react-component-library";
import { Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";

export function NonProjectScopedDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="flex aspect-square size-6 shrink-0 items-center justify-center p-0"
					intent="secondary"
					emphasis="minimal"
				>
					<HorizontalDots className="h-5 w-5 fill-theme-text-secondary" />
				</Button>
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
