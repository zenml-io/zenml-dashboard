import { ComponentIcon } from "@/components/ComponentIcon";
import { CopyMetadataButton } from "@/components/copy-metadata-button";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { isObject } from "@/lib/type-guards";
import { sanitizeUrl } from "@/lib/url";
import { routes } from "@/router/routes";
import { StackComponent, StackComponentType } from "@/types/components";
import { Badge, Box } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { NestedCollapsible } from "../../NestedCollapsible";

type Props = {
	component: StackComponent;
	objectConfig: Record<string, unknown>;
	isDefault?: boolean;
	isNested?: boolean;
	isInactive?: boolean;
};
export function StackInfoComponentListItem({
	component,
	objectConfig,
	isDefault = false,
	isNested = false,
	isInactive = false
}: Props) {
	const nameKey = `${component.body?.type}:${component.name}`;
	const typeKey = `${component.body?.type}.${component.body?.flavor_name}`;
	const settings = objectConfig?.[nameKey] ?? objectConfig?.[typeKey] ?? undefined;

	const isValidObject = isObject(settings);

	if (!isValidObject || Object.keys(settings).length === 0 || isInactive) {
		return (
			<Link to={routes.components.detail(component.id)}>
				<Box className="flex w-full items-center gap-[10px] bg-theme-surface-secondary px-5 py-3 text-left">
					<div className="size-5 shrink-0" />
					<ComponentCollapsibleHeader
						isDefault={isDefault}
						isNested={isNested}
						isInactive={isInactive}
						componentLogoUrl={component.body?.logo_url ?? undefined}
						componentName={component.name}
						componentType={component.body?.type ?? "orchestrator"}
					/>
				</Box>
			</Link>
		);
	}

	return (
		<NestedCollapsible
			intent="secondary"
			contentClassName="pl-[60px]"
			className="w-full"
			isInitialOpen={true}
			title={undefined}
			headerChildren={
				<div className="relative flex w-full items-center justify-between gap-3 text-left">
					<ComponentCollapsibleHeader
						isDefault={isDefault}
						isNested={isNested}
						isInactive={isInactive}
						componentLogoUrl={component.body?.logo_url ?? undefined}
						componentName={component.name}
						componentType={component.body?.type ?? "orchestrator"}
					>
						<div className="z-10 opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100">
							<CopyMetadataButton copyText={JSON.stringify(settings)} />
						</div>
					</ComponentCollapsibleHeader>

					<Link className="absolute inset-0" to={routes.components.detail(component.id)} />
				</div>
			}
			data={settings as Record<string, unknown>}
		></NestedCollapsible>
	);
}

type ComponentCollapsibleHeaderProps = {
	componentName: string;
	componentLogoUrl: string | undefined;
	componentType: StackComponentType;
	isDefault: boolean;
	isNested: boolean;
	isInactive: boolean;
};

function ComponentCollapsibleHeader({
	componentLogoUrl,
	componentName,
	componentType,
	children,
	isDefault,
	isNested,
	isInactive
}: PropsWithChildren<ComponentCollapsibleHeaderProps>) {
	return (
		<div
			className={cn(
				"grid w-full max-w-full grid-cols-3 items-center gap-2",
				isInactive && "opacity-30"
			)}
		>
			{!isNested && (
				<div className="col-span-1 truncate text-theme-text-secondary">
					{snakeCaseToTitleCase(componentType)}
				</div>
			)}
			<div className="col-span-2 flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 overflow-hidden">
					{componentLogoUrl ? (
						<img
							width={32}
							height={32}
							alt={`${componentName} logo`}
							src={sanitizeUrl(componentLogoUrl)}
						/>
					) : (
						<ComponentIcon type={componentType} />
					)}
					<div className="flex items-center gap-1">
						<p className="truncate">{componentName}</p>
						{isDefault && (
							<Badge className="rounded-sm" size="xs" color="purple">
								Default
							</Badge>
						)}
						{isInactive && (
							<Badge className="rounded-sm" size="xs" color="light-grey">
								Inactive
							</Badge>
						)}
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
