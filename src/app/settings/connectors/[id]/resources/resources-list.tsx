import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { InfoBox } from "@/components/Infobox";
import { useResourcesContext } from "@/layouts/connectors-detail/resources-context";
import { TypedResourceModel } from "@/types/service-connectors";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library/components/client";
import { useState } from "react";
import { VerifyButton } from "./verify-button";

export function ResourcesList() {
	const { resources } = useResourcesContext();
	if (!resources) return null;
	const connectorType = resources.connector_type;
	if (!connectorType || typeof connectorType === "string") return null;

	return (
		<div className="space-y-5">
			<div className="flex justify-end">
				<VerifyButton>
					<span>Reverify now</span>
				</VerifyButton>
			</div>
			{resources.resources?.map((resource) => (
				<ResourceItem
					key={resource.resource_type}
					title={
						connectorType.resource_types.find((r) => r.resource_type === resource.resource_type)
							?.name
					}
					logoUrl={
						connectorType.resource_types.find((r) => r.resource_type === resource.resource_type)
							?.logo_url ?? undefined
					}
					resource={resource}
				/>
			))}
		</div>
	);
}

function ResourceItem({
	resource,
	title,
	logoUrl
}: {
	resource: TypedResourceModel;
	title?: string;
	logoUrl?: string;
}) {
	const [open, setOpen] = useState(true);

	const error = resource.error;
	const resourceIds = resource.resource_ids ?? [];

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px] text-text-lg">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					{title || resource.resource_type}
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-theme-border-moderate bg-theme-surface-primary">
				{error ? (
					<div className="p-5">
						<InfoBox intent="error">{error}</InfoBox>
					</div>
				) : (
					<ul className="divide-y divide-theme-border-moderate">
						{resourceIds.map((resourceId) => (
							<li className="flex items-center space-x-2 py-3 pl-8" key={resourceId}>
								{!!logoUrl && (
									<img
										width={24}
										height={24}
										src={logoUrl}
										alt={title}
										className="size-5 shrink-0"
									/>
								)}
								<span>{resourceId}</span>
							</li>
						))}
					</ul>
				)}
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
