import { useCurrentUser } from "@/data/users/current-user-query";
import { Skeleton } from "@zenml-io/react-component-library";

export function HeaderOnboardingBox() {
	return (
		<div className="space-between flex flex-wrap items-center gap-1 truncate">
			<div className="flex-1 space-y-1 overflow-x-hidden">
				<h2 className="truncate text-display-xs font-semibold">
					Welcome to ZenML
					<Username />
				</h2>
				<p className="text-display-xs text-theme-text-secondary">
					You can start by following your quick setup.
				</p>
			</div>
		</div>
	);
}

function Username() {
	const user = useCurrentUser();

	if (user.isError) return null;
	if (user.isPending) return <Skeleton className="h-6 w-[70px]" />;
	const name = user.data.name;
	return <>{name ? `, ${name}` : ""}</>;
}
