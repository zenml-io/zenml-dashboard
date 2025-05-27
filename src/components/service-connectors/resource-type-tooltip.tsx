import { ResourceType } from "@/types/service-connectors";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
type Props = {
	resourceType: ResourceType;
};

export function ResourceTypeTooltip({ resourceType }: Props) {
	const url = resourceType.logo_url;
	const name = resourceType.name;
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className="size-5 shrink-0">
						<img
							width={24}
							height={24}
							className="size-5 shrink-0"
							src={url ?? ""}
							alt={`Logo of ${name}`}
						/>
						<p className="sr-only">{name}</p>
					</div>
				</TooltipTrigger>
				<TooltipContent>{name}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
