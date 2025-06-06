import { CopyButton } from "@/components/CopyButton";
import { InlineAvatar } from "@/components/InlineAvatar";
import { ExpiryDate } from "@/components/service-connectors/expiry";
import { ConnectorTypeTooltip } from "@/components/service-connectors/connector-type-tooltip";
import { ResourceNameTooltip } from "@/components/service-connectors/resource-name-tooltip";
import { ResourceTypeTooltip } from "@/components/service-connectors/resource-type-tooltip";
import { extractResourceTypes } from "@/lib/service-connectors";
import { getUsername } from "@/lib/user";
import { ServiceConnector } from "@/types/service-connectors";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export function useServiceConnectorListColumns(): ColumnDef<ServiceConnector>[] {
	return useMemo<ColumnDef<ServiceConnector>[]>(
		() => [
			{
				id: "name",
				header: "Service Connector",
				accessorKey: "name",
				cell: ({ row }) => {
					const id = row.original.id;
					const name = row.original.name;
					const connectorType = row.original.body?.connector_type;

					return (
						<div className="group/copybutton flex items-center gap-2">
							{!!connectorType && typeof connectorType !== "string" && (
								<ConnectorTypeTooltip connectorType={connectorType} />
							)}
							<div>
								<div className="flex items-center gap-1">
									<div className="block max-w-[200px] truncate text-text-md font-semibold">
										{name}
									</div>
									<CopyButton copyText={name} />
								</div>
								<div className="flex items-center gap-1">
									<div>{id.split("-")[0]}</div>
									<CopyButton copyText={id} />
								</div>
							</div>
						</div>
					);
				}
			},
			{
				id: "resource_types",
				header() {
					return <p className="whitespace-nowrap">Resource Types</p>;
				},
				cell: ({ row }) => {
					const resourceTypes = extractResourceTypes(row.original);
					return (
						<div className="flex items-center gap-0.5">
							{resourceTypes.map((r, idx) => (
								<ResourceTypeTooltip key={idx} resourceType={r} />
							))}
						</div>
					);
				}
			},
			{
				id: "resource-name",
				header() {
					return <p className="whitespace-nowrap">Resource Name</p>;
				},
				cell: ({ row }) => {
					return (
						<div className="max-w-[100px]">
							<ResourceNameTooltip connector={row.original} />
						</div>
					);
				}
			},
			{
				id: "user",
				header: "Author",
				accessorFn: (row) => row.resources?.user?.name,
				cell: ({ row }) => {
					const user = row.original.resources?.user;
					if (!user) return null;
					return <InlineAvatar className="max-w-[200px] truncate" username={getUsername(user)} />;
				}
			},
			{
				id: "expires",
				header() {
					return <p className="whitespace-nowrap">Expires in</p>;
				},
				accessorFn: (row) => row.body?.expires_at,
				cell: ({ row }) => {
					const expires = row.original.body?.expires_at;
					if (!expires) return <p>Never</p>;
					return <ExpiryDate expires={expires} />;
				}
			}
		],
		[]
	);
}
