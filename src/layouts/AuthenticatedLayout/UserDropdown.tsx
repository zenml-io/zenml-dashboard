import LogoutIcon from "@/assets/icons/logout.svg?react";
import { useAuthContext } from "@/context/AuthContext";
import { useServerInfo } from "@/data/server/info-query";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { useCurrentUser } from "@/data/users/current-user-query";
import { isNoAuthServer } from "@/lib/server";
import { getUsername } from "@/lib/user";
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
					<AvatarFallback size="lg">{getUsername(currentUser.data)[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem
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
