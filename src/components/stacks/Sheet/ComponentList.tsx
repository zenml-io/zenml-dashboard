import { CollapsibleCard } from "@/components/CollapsibleCard";
import { stackQueries } from "@/data/stacks";
import { extractComponents, getSortedComponentTypeEntries } from "@/lib/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { routes } from "@/router/routes";
import { StackComponent } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import { Badge, Box, Skeleton } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyButton } from "../../CopyButton";
import { ComponentBadge } from "../../stack-components/ComponentBadge";
import { useIntegrationsContext } from "./IntegrationsContext";

type Props = {
	stackId: string;
};

export function ComponentList({ stackId }: Props) {
	const { setIntegrations } = useIntegrationsContext();
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	useEffect(() => {
		if (!stack.data) return;

		const components = extractComponents(stack.data.metadata?.components);

		const integrations = components
			.map((component) => component.body?.integration)
			.filter(
				(integration): integration is string =>
					!!integration && integration !== "built-in" && integration !== "custom"
			);

		if (integrations.length >= 1) {
			setIntegrations((prev) => Array.from(new Set([...prev, ...integrations])));
		}
	}, [stack.data, setIntegrations]);

	if (stack.isError) return null;
	if (stack.isPending)
		return (
			<div className="p-5">
				<Skeleton className="h-[300px] w-full" />
			</div>
		);

	const componentsList = stack.data.metadata?.components;

	if (!componentsList) return null;

	const sortedEntries = getSortedComponentTypeEntries(componentsList);

	return (
		<ul className="space-y-5 p-5">
			{sortedEntries.map(([type, components]) => {
				const hasMoreThanOne = components.length > 1;

				if (hasMoreThanOne) {
					return (
						<li key={type}>
							<CollapsibleCard
								title={
									<div className="flex items-center gap-1">
										{snakeCaseToTitleCase(type)}s{" "}
										<Badge className="rounded-sm" size="xs" color="grey">
											{components.length}
										</Badge>
									</div>
								}
								initialOpen
							>
								<ComponentItemList components={components} showDefaultBadge />
							</CollapsibleCard>
						</li>
					);
				}

				return (
					<li key={type}>
						<ComponentItemList components={components} />
					</li>
				);
			})}
		</ul>
	);
}

function ComponentItemList({
	components,
	showDefaultBadge = false
}: {
	components: StackComponent[];
	showDefaultBadge?: boolean;
}) {
	return (
		<ul className="space-y-5">
			{components.map((component, idx) => (
				<li key={component.id}>
					<ComponentListItem isDefault={showDefaultBadge && idx === 0} component={component} />
				</li>
			))}
		</ul>
	);
}

type ComponentListItemProps = {
	component: StackComponent;
	isDefault?: boolean;
};

function ComponentListItem({ component, isDefault }: ComponentListItemProps) {
	return (
		<Box className="flex items-center justify-between p-5">
			<div className="flex items-center space-x-3">
				<img
					width={32}
					height={32}
					alt={`${component.resources?.flavor?.body?.display_name} logo`}
					src={sanitizeUrl(component.body?.logo_url || "")}
				/>
				<div>
					<div className="flex items-center gap-1">
						<Link to={routes.components.detail(component.id)} className="text-text-xl">
							{component.name}
						</Link>
						{isDefault && (
							<Badge className="rounded-sm" size="xs" color="purple">
								Default
							</Badge>
						)}
					</div>
					<div className="group/copybutton flex items-center gap-0.5">
						<p className="text-text-sm text-theme-text-secondary">{component.id.split("-")[0]}</p>
						<CopyButton copyText={component.id} />
					</div>
				</div>
			</div>

			<Link to={routes.components.overview}>
				<ComponentBadge type={component.body?.type || "orchestrator"}>
					{snakeCaseToTitleCase(component.body?.type || "")}
				</ComponentBadge>
			</Link>
		</Box>
	);
}
