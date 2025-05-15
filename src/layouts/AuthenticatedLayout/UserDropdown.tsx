import File from "@/assets/icons/file.svg?react";
import LogoutIcon from "@/assets/icons/logout.svg?react";
import Users from "@/assets/icons/users.svg?react";
import { useAuthContext } from "@/context/AuthContext";
import { useServerInfo } from "@/data/server/info-query";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { useCurrentUser } from "@/data/users/current-user-query";
import { isNoAuthServer } from "@/lib/server";
import {
	Avatar,
	AvatarFallback,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Skeleton
} from "@zenml-io/react-component-library";
import { useNavigate } from "react-router-dom";
import ChangeLogButton from "./changelog-button";

export function UserDropdown() {
	const currentUser = useCurrentUser();
	const serverInfo = useServerInfo();
	const { removeAuthState } = useAuthContext();
	const navigate = useNavigate();
	const mutation = useLogoutMutation({
		onSuccess: () => {
			removeAuthState();
			navigate("/login");
		}
	});

	if (currentUser.isError || serverInfo.isError) return null;

	if (currentUser.isPending || serverInfo.isPending) return <Skeleton />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar size="lg">
					<AvatarFallback size="lg">{currentUser.data.name[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<ChangeLogButton />
				<DropdownMenuItem asChild icon={<File />}>
					<a
						className="cursor-pointer"
						rel="noopener noreferrer"
						target="_blank"
						href="https://docs.zenml.io/"
					>
						Docs
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem asChild icon={<Users />}>
					<a
						className="cursor-pointer"
						rel="noopener noreferrer"
						target="_blank"
						href="https://zenml.io/slack"
					>
						Community
					</a>
				</DropdownMenuItem>
				<div aria-hidden="true" className="my-1 h-[1px] bg-theme-border-moderate"></div>
				<DropdownMenuItem
					className="cursor-pointer"
					disabled={isNoAuthServer(serverInfo.data.auth_scheme)}
					onClick={() => mutation.mutate()}
					icon={<LogoutIcon className="h-3 w-3 fill-neutral-400" />}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
