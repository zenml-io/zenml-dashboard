import { sanitizeUrl } from "@/lib/url";
import { ConnectorType } from "@/types/service-connectors";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";

type Props = {
	connectorType: ConnectorType;
};

export function ConnectorTypeTooltip({ connectorType }: Props) {
	const url = connectorType.logo_url;
	const name = connectorType.name;
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className="size-5 shrink-0">
						<img
							width={24}
							height={24}
							className="size-5 shrink-0"
							src={sanitizeUrl(url ?? "")}
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
