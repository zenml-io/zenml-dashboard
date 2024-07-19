import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { stackQueries } from "@/data/stacks";
import { extractComponents } from "@/lib/components";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { StackComponent } from "@/types/components";
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
import { PropsWithChildren, useEffect } from "react";
import { CopyButton } from "../../CopyButton";
import { ComponentBadge } from "../../stack-components/ComponentBadge";
import { ComponentFallbackDialog } from "../../stack-components/ComponentFallbackDialog";
import { IntegrationsContextProvider, useIntegrationsContext } from "./IntegrationsContext";

type Props = {
	stackId: string;
};

export function StackSheet({
	children,
	stackId,
	stackName
}: PropsWithChildren<Props & { stackName: string }>) {
	return (
		<Sheet>
			<SheetTrigger>{children}</SheetTrigger>
			<SheetContent className="w-[1000px] overflow-y-auto">
				<IntegrationsContextProvider>
					<SheetHeader />
					<StackHeadline stackId={stackId} />
					<StackSetCommand name={stackName} />
					<ComponentList stackId={stackId} />
				</IntegrationsContextProvider>
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
	const { setIntegrations } = useIntegrationsContext();
	const stack = useQuery({ ...stackQueries.stackDetail(stackId) });

	useEffect(() => {
		if (!stack.data) return;

		const components = extractComponents(
			stack.data.metadata?.components as Record<string, StackComponent[]> | undefined
		);

		const integrations = components
			.map((component) => component.body?.integration)
			.filter(
				(integration): integration is string =>
					!!integration && integration !== "built-in" && integration !== "custom"
			);

		if (integrations.length >= 1) {
			setIntegrations((prev) => Array.from(new Set([...prev, ...integrations])));
		}
	}, [stack.data]);

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
				<img
					width={32}
					height={32}
					alt={`${component.body?.flavor} logo`}
					src={sanitizeUrl(component.body?.logo_url || "")}
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

type StackSetCommandProps = {
	name: string;
};
function StackSetCommand({ name }: StackSetCommandProps) {
	const { integrations } = useIntegrationsContext();

	return (
		<section className="px-5 pt-5">
			<CollapsibleCard title={<span className="text-text-lg">Set this stack</span>}>
				<ul className="space-y-5">
					<li className="space-y-2">
						<div className="flex items-center gap-2">
							<Number>1</Number>
							<p className="font-semibold">Set your stack</p>
						</div>
						<div className="space-y-1">
							<p className="text-text-sm text-theme-text-secondary">
								Set the stack as active on your client
							</p>
							<Codesnippet
								codeClasses="whitespace-pre-wrap"
								wrap
								code={`zenml stack set ${name}`}
							/>
						</div>
					</li>
					{integrations.length >= 1 && (
						<li className="space-y-2">
							<div className="flex items-center gap-2">
								<Number>2</Number>
								<p className="font-semibold">Install the integrations</p>
							</div>
							<div className="space-y-1">
								<p className="text-text-sm text-theme-text-secondary">
									Install the required integrations to run pipelines in your stack
								</p>
								<Codesnippet
									codeClasses="whitespace-pre-wrap"
									wrap
									code={`zenml integration install ${integrations.join(" ")}`}
								/>
							</div>
						</li>
					)}
				</ul>
			</CollapsibleCard>
		</section>
	);
}

function Number({ children }: PropsWithChildren) {
	return (
		<div className="flex h-7 w-7 items-center justify-center rounded-sm bg-primary-100 text-text-lg font-semibold text-theme-text-brand">
			{children}
		</div>
	);
}
