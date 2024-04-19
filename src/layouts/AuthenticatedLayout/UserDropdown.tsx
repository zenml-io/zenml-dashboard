import { useAuthContext } from "@/context/AuthContext";
import { useLogoutMutation } from "@/data/session/logout-mutation";
import { useCurrentUser } from "@/data/users/current-user-query";
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
import { getUsername } from "@/lib/user";
import { Icon } from "@/components/Icon";

export function UserDropdown() {
	const { data, isPending, isError } = useCurrentUser();
	const { removeAuthState } = useAuthContext();
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
					<AvatarFallback size="lg">{getUsername(data)[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" sideOffset={7}>
				<DropdownMenuItem
					onClick={() => mutation.mutate()}
					icon={<Icon name="logout" className="h-3 w-3 fill-neutral-400" />}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
