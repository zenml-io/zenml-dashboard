import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { ServiceConnector } from "@/types/service-connectors";

export function ResourceNameTooltip({ connector }: { connector: ServiceConnector }) {
	const name = connector.body?.resource_id || "Multiple";
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger className="max-w-full truncate">
					<Tag
						size="sm"
						rounded={false}
						emphasis="minimal"
						className="block w-fit max-w-full gap-0.5 truncate text-theme-text-primary"
						color="grey"
					>
						{name}
					</Tag>
				</TooltipTrigger>
				<TooltipContent>{name}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
