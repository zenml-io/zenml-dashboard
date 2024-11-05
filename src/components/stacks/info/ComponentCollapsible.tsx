import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { routes } from "@/router/routes";
import { StackComponent } from "@/types/components";
import { Box, Button } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { NestedCollapsible } from "../../NestedCollapsible";
import { ComponentBadge } from "../../stack-components/ComponentBadge";

type Props = {
	component: StackComponent;
	objectConfig: Record<string, any>;
};
export function ComponentCollapsible({ component, objectConfig }: Props) {
	const keyName = `${component.body?.type}.${component.body?.flavor}`;
	const settings = objectConfig?.[keyName] ?? undefined;

	if (!settings || Object.keys(settings).length === 0) {
		return (
			<Link to={routes.components.detail(component.id)}>
				<Box className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left">
					<ComponentCollapsibleItem component={component} />
				</Box>
			</Link>
		);
	}

	return (
		<NestedCollapsible
			intent="primary"
			contentClassName="pl-[60px]"
			className="w-full"
			isInitialOpen={false}
			title={
				<div className="flex w-full items-center justify-between gap-3 text-left">
					<ComponentCollapsibleItem component={component} />
				</div>
			}
			data={settings}
		>
			<Button
				asChild
				intent="secondary"
				emphasis="subtle"
				className="mx-auto flex w-fit justify-center text-text-sm text-theme-text-secondary"
			>
				<Link to={routes.components.detail(component.id)}>See Component Details</Link>
			</Button>
		</NestedCollapsible>
	);
}

export function ComponentCollapsibleItem({ component }: { component: StackComponent }) {
	return (
		<>
			<div className="flex items-center gap-2">
				<img
					width={32}
					height={32}
					alt={`${component.body?.flavor} logo`}
					src={sanitizeUrl(component.body?.logo_url || "")}
				/>
				<div>
					<p className="text-text-lg">{component.name}</p>
					<p className="text-text-sm text-theme-text-secondary">{component.id.split("-")[0]}</p>
				</div>
			</div>
			<ComponentBadge type={component.body?.type || "orchestrator"}>
				{snakeCaseToTitleCase(component.body?.type || "")}
			</ComponentBadge>
		</>
	);
}
