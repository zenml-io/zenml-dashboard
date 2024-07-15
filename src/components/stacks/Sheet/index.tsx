import { SheetHeader } from "@/components/sheet/SheetHeader";
import { flavorQueries } from "@/data/flavors";
import { stackQueries } from "@/data/stacks";
import { extractComponents } from "@/lib/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { StackComponent, StackComponentType } from "@/types/components";
import { useQuery } from "@tanstack/react-query";
import {
	Avatar,
	AvatarFallback,
	Box,
	Sheet,
	SheetContent,
	SheetTrigger,
	Skeleton
} from "@zenml-io/react-component-library";
import { PropsWithChildren } from "react";
import { CopyButton } from "../../CopyButton";
import { ComponentBadge } from "../../stack-components/ComponentBadge";
import { ComponentFallbackDialog } from "../../stack-components/ComponentFallbackDialog";

type Props = {
	stackId: string;
};

export function StackSheet({ children, stackId }: PropsWithChildren<Props>) {
	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent className="w-[1000px] overflow-y-auto">
				<SheetHeader />
				<StackHeadline stackId={stackId} />
				<ComponentList stackId={stackId} />
			</SheetContent>
		</Sheet>
	);
}

function StackHeadline({ stackId }: Props) {
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	if (stack.isError) return null;
	if (stack.isPending)
		return (
			<div className="p-5">
				<Skeleton className="h-6 w-full" />
			</div>
		);

	return (
		<div className="flex items-center space-x-2 border-b border-theme-border-moderate bg-theme-surface-primary p-5">
			<Avatar type="square" size="lg">
				<AvatarFallback size="lg">{stack.data.name[0]}</AvatarFallback>
			</Avatar>
			<div>
				<div className="group/copybutton flex items-center gap-0.5">
					<p className="mb-0.5 text-text-sm text-theme-text-secondary">{stack.data.id}</p>
					<CopyButton copyText={stack.data.id} />
				</div>

				<div className="flex items-center gap-1">
					<h2 className="text-display-xs font-semibold">{stack.data.name}</h2>
				</div>
			</div>
		</div>
	);
}

function ComponentList({ stackId }: Props) {
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	if (stack.isError) return null;
	if (stack.isPending)
		return (
			<div className="p-5">
				<Skeleton className="h-[300px] w-full" />
			</div>
		);

	const components = extractComponents(
		stack.data.metadata?.components as Record<string, StackComponent[]> | undefined
	);

	return (
		<ul className="space-y-5 p-5">
			{components.map((component) => (
				<li key={component.id}>
					<ComponentListItem component={component} />
				</li>
			))}
		</ul>
	);
}

type ComponentListItemProps = {
	component: StackComponent;
};
function ComponentListItem({ component }: ComponentListItemProps) {
	return (
		<Box className="flex items-center justify-between p-5">
			<div className="flex items-center space-x-3">
				<FlavorIcon
					flavor={component.body?.flavor || ""}
					type={component.body?.type || "orchestrator"}
				/>
				<div>
					<ComponentFallbackDialog
						type={component.body?.type || "orchestrator"}
						name={component.name}
					>
						<button className="text-text-xl">{component.name}</button>
					</ComponentFallbackDialog>
					<div className="group/copybutton flex items-center gap-0.5">
						<p className="text-text-sm text-theme-text-secondary">{component.id.split("-")[0]}</p>
						<CopyButton copyText={component.id} />
					</div>
				</div>
			</div>
			<ComponentBadge type={component.body?.type || "orchestrator"}>
				{snakeCaseToTitleCase(component.body?.type || "")}
			</ComponentBadge>
		</Box>
	);
}

type FlavorIconProps = {
	flavor: string;
	type: StackComponentType;
};

function FlavorIcon({ flavor, type }: FlavorIconProps) {
	const flavorQuery = useQuery({ ...flavorQueries.flavorList({ name: flavor, type }) });

	if (flavorQuery.isError) return null;
	if (flavorQuery.isPending) return <Skeleton className="h-6 w-6" />;

	return (
		<img
			width={32}
			height={32}
			alt={`${flavor} logo`}
			src={sanitizeUrl(flavorQuery.data.items[0].body?.logo_url ?? "")}
		/>
	);
}
