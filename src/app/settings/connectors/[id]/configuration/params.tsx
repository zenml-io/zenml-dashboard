import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import { ExpiryDate } from "@/components/service-connectors/expiry";
import { ResourceNameTooltip } from "@/components/service-connectors/resource-name-tooltip";
import { ResourceTypesList } from "@/components/service-connectors/resource-tyes-list";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { extractAuthMethod, extractResourceTypes } from "@/lib/service-connectors";
import { ServiceConnector } from "@/types/service-connectors";
import { useQuery } from "@tanstack/react-query";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library/components/client";
import { Skeleton, Tag } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function BasicParams() {
	const [open, setOpen] = useState(true);
	const { connectorId } = useParams() as { connectorId: string };
	const connectorQuery = useQuery({
		...serviceConnectorQueries.serviceConnectorDetail(connectorId),
		throwOnError: true
	});
	if (connectorQuery.isPending) return <Skeleton className="h-[300px] w-full" />;
	if (connectorQuery.isError) return <div>Error</div>;

	const connector = connectorQuery.data;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px] text-text-lg">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					Basic Parameters
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-5 border-t border-theme-border-moderate bg-theme-surface-primary p-5">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:gap-y-4 lg:grid-cols-3">
					<KeyValue label="Name" value={connector.name} />
					<ConnectorType connector={connector} />
					<AuthMethod connector={connector} />
					<ResourceTypes connector={connector} />
					<ResourceName connector={connector} />
					<Author connector={connector} />
					<Expires connector={connector} />
					<Created connector={connector} />
					<Updated connector={connector} />
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}

function ConnectorType({ connector }: { connector: ServiceConnector }) {
	const connectorType = connector.body?.connector_type;
	if (!connectorType || typeof connectorType === "string") return null;

	return (
		<KeyValue
			label="Type"
			value={
				<Tag
					size="sm"
					rounded={false}
					emphasis="minimal"
					className="w-fit gap-0.5 text-theme-text-primary"
					color="grey"
				>
					<img
						src={connectorType.logo_url ?? ""}
						className="h-4 w-4 shrink-0"
						alt={connectorType.name}
					/>
					<span>{connectorType.name}</span>
				</Tag>
			}
		/>
	);
}

function AuthMethod({ connector }: { connector: ServiceConnector }) {
	const authMethod = extractAuthMethod(connector);

	return (
		<KeyValue
			label="Auth Method"
			value={
				authMethod === undefined ? null : (
					<Tag
						size="sm"
						rounded={false}
						emphasis="minimal"
						className="w-fit text-theme-text-primary"
						color="grey"
					>
						<span>{authMethod.name || connector.body?.auth_method}</span>
					</Tag>
				)
			}
		/>
	);
}
function ResourceTypes({ connector }: { connector: ServiceConnector }) {
	const resourceTypes = extractResourceTypes(connector);
	return (
		<>
			<Key>Resrouce Types</Key>
			<Value className="h-auto">
				<ResourceTypesList resourceTypes={resourceTypes} />
			</Value>
		</>
	);
}

function ResourceName({ connector }: { connector: ServiceConnector }) {
	return <KeyValue label="Resource Name" value={<ResourceNameTooltip connector={connector} />} />;
}

function Author({ connector }: { connector: ServiceConnector }) {
	const user = connector.resources?.user;

	return (
		<KeyValue
			label="Author"
			value={
				!user ? null : (
					<InlineAvatar
						avatarUrl={user.body?.avatar_url ?? undefined}
						username={user.name}
						isServiceAccount={!!user.body?.is_service_account}
					/>
				)
			}
		/>
	);
}

function Expires({ connector }: { connector: ServiceConnector }) {
	const expires = connector.body?.expires_at;
	return (
		<KeyValue label="Expires in" value={!expires ? "Never" : <ExpiryDate expires={expires} />} />
	);
}

function Created({ connector }: { connector: ServiceConnector }) {
	const created = connector.body?.created;
	return (
		<KeyValue
			label="Created"
			value={
				created ? (
					<span className="truncate">
						<DisplayDate dateString={created} />
					</span>
				) : null
			}
		/>
	);
}

function Updated({ connector }: { connector: ServiceConnector }) {
	const updated = connector.body?.updated;
	return (
		<KeyValue
			label="Updated"
			value={
				updated ? (
					<span className="truncate">
						<DisplayDate dateString={updated} />
					</span>
				) : null
			}
		/>
	);
}
