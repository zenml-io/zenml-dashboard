import { Badge } from "@zenml-io/react-component-library/components/server";

export function ProBadge() {
	return (
		<Badge color="yellow" rounded size="sm">
			<span className="font-semibold text-primary-500">Pro</span>
		</Badge>
	);
}
