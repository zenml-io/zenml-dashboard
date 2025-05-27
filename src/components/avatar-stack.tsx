import { User } from "@/types/user";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library/components/client";
import { cn } from "@zenml-io/react-component-library/utilities";

type Props = {
	totalUsers: number;
	users: User[];
	max?: number;
	className?: string;
};
export function AvatarStack({ users, totalUsers, max = 4, className }: Props) {
	// Calculate how many additional users there are beyond the visible ones
	const additionalUsersCount = totalUsers > max ? totalUsers - max : 0;

	// Get only the users to display
	const visibleUsers = users.slice(0, max);

	return (
		<div className={cn("flex items-center -space-x-[10px]", className)}>
			{visibleUsers.map((user) => (
				<Avatar
					key={user.id}
					size="lg"
					className="border-[4px] border-theme-surface-primary bg-theme-surface-primary"
					type="rounded"
				>
					<AvatarFallback size="lg">{user.name[0]}</AvatarFallback>
				</Avatar>
			))}

			{additionalUsersCount > 0 && (
				<Avatar size="lg" className="border-[4px] border-theme-surface-primary" type="rounded">
					<AvatarFallback
						size="lg"
						className="bg-neutral-200 text-text-sm text-theme-text-secondary"
					>
						<div className="flex h-full w-full items-center justify-center">
							+{additionalUsersCount}
						</div>
					</AvatarFallback>
				</Avatar>
			)}
		</div>
	);
}
