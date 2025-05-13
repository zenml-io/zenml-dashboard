import { AvatarStack } from "@/components/avatar-stack";
import { useAllMembers } from "@/data/users/users-all-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";

export function ServerMembers() {
	const membersQuery = useAllMembers({ params: { active: true } });

	if (membersQuery.isPending) return <Skeleton className="h-7 w-[160px]" />;
	if (membersQuery.isError) return null;

	const users = membersQuery.data;

	return <AvatarStack className="justify-center" users={users.items} totalUsers={users.total} />;
}
