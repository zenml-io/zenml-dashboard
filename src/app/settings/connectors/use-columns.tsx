import { CopyButton } from "@/components/CopyButton";
import { InlineAvatar } from "@/components/InlineAvatar";
import { ConnectorTypeTooltip } from "@/components/service-connectors/connector-type-tooltip";
import { ResourceTypeTooltip } from "@/components/service-connectors/resource-type-tooltip";
import { extractResourceTypes } from "@/lib/service-connector";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { ServiceConnector } from "../../../types/service-connectors";

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
									<p className="max-w-[200px] truncate text-text-md font-semibold">{name}</p>
									<CopyButton copyText={name} />
								</div>
								<div className="flex items-center gap-1">
									{id.split("-")[0]}
									<CopyButton copyText={id} />
								</div>
							</div>
						</div>
					);
				}
			},
			{
				id: "resource_types",
				header: "Resource Types",
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
				id: "user",
				header: "Author",
				accessorFn: (row) => row.body?.user?.name,
				cell: ({ row }) => {
					const user = row.original.body?.user?.name;
					if (!user) return null;
					return <InlineAvatar className="max-w-[200px] truncate" username={user} />;
				}
			},
			{
				id: "expires",
				header: "Expires in",
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

function ExpiryDate({ expires }: { expires: string }) {
	const [timeLeft, setTimeLeft] = useState<string>("");

	useEffect(() => {
		function calculateTimeLeft() {
			const expiryDate = new Date(`${expires}Z`);
			const now = new Date();

			if (expiryDate < now) {
				setTimeLeft("Expired");
				return;
			}

			const diffMs = expiryDate.getTime() - now.getTime();
			const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
			const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

			if (diffDays > 0) {
				setTimeLeft(`in ${diffDays} ${diffDays === 1 ? "day" : "days"}`);
			} else if (diffHours > 0) {
				setTimeLeft(`in ${diffHours} ${diffHours === 1 ? "hour" : "hours"}`);
			} else if (diffMinutes > 0) {
				setTimeLeft(`in ${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"}`);
			} else {
				setTimeLeft("in less than a minute");
			}
		}

		calculateTimeLeft();
	}, [expires]);

	return timeLeft;
}
