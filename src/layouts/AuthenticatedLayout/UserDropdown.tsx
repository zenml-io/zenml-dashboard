import { useCurrentUser } from "@/data/users/current-user-query";
import { getUsername } from "@/lib/user";
import { Avatar, AvatarFallback, Skeleton } from "@zenml-io/react-component-library";

export function UserDropdown() {
	const currentUser = useCurrentUser();

	if (currentUser.isError) return null;

	if (currentUser.isPending) return <Skeleton />;

	return (
		<Avatar size="lg">
			<AvatarFallback size="lg">{getUsername(currentUser.data)[0]}</AvatarFallback>
		</Avatar>
	);
}
