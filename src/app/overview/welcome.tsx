import { useCurrentUser } from "@/data/users/current-user-query";
import { getUsername } from "@/lib/user";
import { Avatar, AvatarFallback, Skeleton } from "@zenml-io/react-component-library/components";

export function Welcome() {
	const userQuery = useCurrentUser();

	if (userQuery.isPending) {
		return (
			<div className="flex items-center gap-3">
				<Skeleton className="size-9 shrink-0 rounded-rounded" />
				<Skeleton className="h-6 w-[200px]" />
			</div>
		);
	}

	if (userQuery.isError) {
		return <div>Error loading user</div>;
	}

	const name = getUsername(userQuery.data);

	return (
		<div className="flex items-center gap-3">
			<Avatar size="xl">
				<AvatarFallback size="xl">{name?.charAt(0) || "U"}</AvatarFallback>
			</Avatar>
			<span className="text-display-xs font-semibold">Welcome back{name ? `, ${name}` : ""}</span>
		</div>
	);
}
