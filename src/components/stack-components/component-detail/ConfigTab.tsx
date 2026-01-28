import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { ConnectorTag } from "@/components/service-connectors/connector-tag";
import { sanitizeUrl } from "@/lib/url";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { Skeleton, Tag } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { DisplayDate } from "../../DisplayDate";
import { InlineAvatar } from "../../InlineAvatar";
import { KeyValue } from "../../KeyValue";
import { NestedCollapsible } from "../../NestedCollapsible";
import { useComponent } from "./hooks";

type Props = {
	componentId: string;
};
export function ComponentConfigTab({ componentId }: Props) {
	return (
		<section className="grid grid-cols-1 gap-5 @5xl:grid-cols-2">
			<div>
				<BasicParams componentId={componentId} />
			</div>
			<div className="space-y-5">
				<ConfigCollapsible componentId={componentId} />
				<ComponentLabels componentId={componentId} />
			</div>
		</section>
	);
}

function BasicParams({ componentId }: Props) {
	const [open, setOpen] = useState(true);
	const componentQuery = useComponent(componentId);
	if (componentQuery.isError) return null;
	if (componentQuery.isPending) return <Skeleton className="h-[150px] w-full" />;

	const component = componentQuery.data;

	const user = component.resources?.user;
	const created = component.body?.created;
	const updated = component.body?.updated;
	const connector = component.metadata?.connector;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} mr-2 h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Basic Parameters
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					{/* <KeyValue
						label="Id"
						value={
							<div className="group/copybutton flex items-center gap-0.5">
								<p className="truncate">{component.data.id}</p>
								<CopyButton copyText={component.data.id} />
							</div>
						}
					/> */}
					<KeyValue label="Component Name" value={component.name} />
					<KeyValue
						label="Flavor"
						value={
							<Tag
								rounded={false}
								className="w-fit gap-0.5 text-theme-text-primary"
								color="grey"
								emphasis="minimal"
							>
								<img
									width={20}
									height={20}
									src={sanitizeUrl(component.body?.logo_url || "")}
									alt="Flavor Icon of Component"
								/>
								<p className="truncate">{component.resources?.flavor?.body?.display_name}</p>
							</Tag>
						}
					/>
					<KeyValue
						label="Author"
						value={
							user ? (
								<InlineAvatar
									avatarUrl={user.body?.avatar_url ?? undefined}
									username={user.name}
									isServiceAccount={!!user.body?.is_service_account}
								/>
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="Service Connector"
						value={
							connector ? (
								<ConnectorTag connectorName={connector.name} connectorId={connector.id} />
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="Updated"
						value={updated ? <DisplayDate dateString={updated} /> : "Not available"}
					/>
					<KeyValue
						label="Created"
						value={created ? <DisplayDate dateString={created} /> : "Not available"}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

function ConfigCollapsible({ componentId }: Props) {
	const component = useComponent(componentId);
	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-[150px] w-full" />;
	return (
		<NestedCollapsible
			isInitialOpen
			intent="primary"
			title="Configuration"
			data={component.data.metadata?.configuration}
		/>
	);
}

function ComponentLabels({ componentId }: Props) {
	const component = useComponent(componentId);

	if (component.isError) return null;
	if (component.isPending) return <Skeleton className="h-[150px] w-full" />;

	const labels = component.data.metadata?.labels;

	if (!labels || Object.keys(labels).length === 0) return null;

	return <NestedCollapsible intent="primary" isInitialOpen title="Labels" data={labels} />;
}
