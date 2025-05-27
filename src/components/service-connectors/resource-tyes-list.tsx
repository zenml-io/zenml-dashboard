import { ResourceType } from "@/types/service-connectors";
import { Tag } from "@zenml-io/react-component-library/components";
import { cn } from "@zenml-io/react-component-library/utilities";

export function ResourceTypesList({
	resourceTypes,
	className,
	size = "sm",
	iconSize = 20
}: {
	resourceTypes: ResourceType[];
	className?: string;
	size?: "sm" | "xs";
	iconSize?: number;
}) {
	return (
		<div className="flex flex-wrap gap-1">
			{resourceTypes.map((r) => (
				<Tag
					key={r.name}
					size={size}
					rounded={false}
					emphasis="minimal"
					className={cn("w-fit gap-0.5 text-theme-text-primary", className)}
					color="grey"
				>
					<img
						width={iconSize}
						height={iconSize}
						className="shrink-0 object-contain"
						src={r.logo_url ?? ""}
						alt={`Logo of ${r.name}`}
					/>
					<p>{r.name}</p>
				</Tag>
			))}
		</div>
	);
}
