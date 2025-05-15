import { Skeleton, Tag } from "@zenml-io/react-component-library/components/server";
import { cn } from "@zenml-io/react-component-library/utilities";
import { Controller, useFormContext } from "react-hook-form";
import { ConnectorTypeSelectForm } from "./schema";
import { AuthMethod, ConnectorType, ResourceType } from "@/types/service-connectors";
import { ResourceTypesList } from "@/components/service-connectors/resource-tyes-list";
import { truncateText } from "@/lib/strings";
import { useQuery } from "@tanstack/react-query";
import { serviceConnectorQueries } from "@/data/service-connectors";

export function ConnectorTypeList() {
	const typeQuery = useQuery(serviceConnectorQueries.serviceConnectorTypeList());
	const { control } = useFormContext<ConnectorTypeSelectForm>();

	if (typeQuery.isError) return <p>Failed to fetch Connector Type List</p>;
	if (typeQuery.isPending) return <ListSkeleton />;

	const connectorTypes = typeQuery.data;

	return (
		<ul className="space-y-2">
			{connectorTypes.map((ct) => (
				<li key={ct.name}>
					<Controller
						control={control}
						name="connectorType"
						render={({ field: { onChange, value } }) => (
							<label
								className={cn(
									"flex w-full cursor-pointer items-center gap-5 rounded-md border p-5 transition-colors",
									{
										"border-primary-400 bg-primary-25 shadow-sm": value === ct.connector_type,
										"border-theme-border-moderate hover:border-theme-border-bold hover:shadow-sm":
											value !== ct.connector_type
									}
								)}
							>
								<input
									type="radio"
									name="connectorType"
									onChange={() => onChange(ct.connector_type)}
									checked={value === ct.connector_type}
									value={ct.name}
									className="h-3 w-3 border !border-theme-border-bold text-theme-surface-primary focus:ring-2 focus:ring-theme-surface-strong"
								/>
								<div className="grid grid-cols-1 items-center gap-5 xl:grid-cols-3">
									<Description connectorType={ct} />
									<ResourceTypes resourceTypes={ct.resource_types} />
									<AuthMethods authMethods={ct.auth_methods} />
								</div>
							</label>
						)}
					/>
				</li>
			))}
		</ul>
	);
}

export function Description({ connectorType }: { connectorType: ConnectorType }) {
	return (
		<div className="flex items-center gap-3">
			{connectorType.logo_url && (
				<img
					src={connectorType.logo_url}
					width={32}
					height={32}
					className="size-6 shrink-0"
					alt={connectorType.name}
				/>
			)}
			<div className="space-y-0.5">
				<div className="text-text-lg font-semibold">{connectorType.name}</div>
				{connectorType.description && (
					<span className="text-text-sm text-theme-text-secondary">
						{truncateText(connectorType.description, 70)}
					</span>
				)}
			</div>
		</div>
	);
}

export function ResourceTypes({ resourceTypes }: { resourceTypes: ResourceType[] }) {
	return (
		<div className="space-y-0.5">
			<p className="text-text-xs text-theme-text-secondary">Resource Types</p>
			<ResourceTypesList iconSize={16} size="xs" resourceTypes={resourceTypes} />
		</div>
	);
}

function AuthMethods({ authMethods }: { authMethods: AuthMethod[] }) {
	return (
		<div className="space-y-0.5">
			<p className="text-text-xs text-theme-text-secondary">Auth Methods</p>
			<div className="flex flex-wrap gap-1">
				{authMethods.map((am) => (
					<Tag
						className="w-fit"
						key={am.auth_method}
						color="blue"
						emphasis="subtle"
						size="xs"
						rounded={false}
					>
						{am.name}
					</Tag>
				))}
			</div>
		</div>
	);
}

function ListSkeleton() {
	return (
		<div className="w-full space-y-2">
			{[...Array(4)].map((_, i) => (
				<Skeleton className="h-[110px] w-full" key={i} />
			))}
		</div>
	);
}
