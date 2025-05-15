import { useCurrentUser } from "@/data/users/current-user-query";
import { getUsername } from "@/lib/user";
import { Skeleton } from "@zenml-io/react-component-library";

export function HeaderOnboardingBox() {
	return (
		<div className="w-full space-y-1 overflow-x-hidden">
			<div className="space-y-1">
				<h2 className="text-display-xs font-semibold">
					Hi
					<Username />
				</h2>
				<p className="text-theme-text-secondary">
					Welcome to ZenML. This is the beginning to get the most advantage of all the Pro features
					of ZenML.
				</p>
			</div>
		</div>
	);
}

function Username() {
	const user = useCurrentUser();

	if (user.isError) return null;
	if (user.isPending) return <Skeleton className="h-6 w-[70px]" />;
	const name = getUsername(user.data);
	return <>{name ? `, ${name}` : ""}</>;
}
