import { Badge } from "@zenml-io/react-component-library/components/server";

export function ProBadge() {
	return (
		<Badge color="yellow" rounded={false} className="rounded-md">
			<span className="font-semibold uppercase">Pro</span>
		</Badge>
	);
}
