import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem
} from "@zenml-io/react-component-library";
// import Users from "@/assets/icons/users.svg";
import Edit from "@/assets/icons/edit.svg?react";
import DotsIcon from "@/assets/icons/dots-horizontal.svg?react";

export default function MembersDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<DotsIcon className="h-4 w-4 fill-theme-text-tertiary" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem asChild icon={<DotsIcon />}>
					{/* <Link
						className="flex items-center font-medium hover:cursor-pointer data-[highlighted]:bg-theme-surface-tertiary"
						href={routes.organizations.tenants.settings.members(orgId, tenantId)}
					> */}
					Add members
					{/* </Link> */}
				</DropdownMenuItem>
				<DropdownMenuItem asChild icon={<Edit />}>
					Upgrade Permissions
				</DropdownMenuItem>
				{/* {!systemManaged && (
					<DropdownMenuItem asChild>
						<RemoveRole id={roleId} />
					</DropdownMenuItem>
				)} */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
