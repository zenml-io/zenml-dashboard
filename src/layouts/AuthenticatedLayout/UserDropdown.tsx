import LogoutIcon from "@/assets/icons/logout.svg?react";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { useCurrentUser } from "@/data/user/current-user-query";
import { removeAuthState } from "@/lib/sessions";
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
	const { data, isPending, isError } = useCurrentUser();
	const navigate = useNavigate();
	const mutation = useLogoutMutation({
		onSuccess: () => {
			removeAuthState();
			navigate("/login");
		}
	});

	if (isError) return null;

	if (isPending) return <Skeleton />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar size="lg">
					<AvatarFallback size="lg">{data.name[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem
					onClick={() => mutation.mutate()}
					icon={<LogoutIcon className="h-3 w-3 fill-neutral-400" />}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
