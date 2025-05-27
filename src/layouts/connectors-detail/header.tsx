import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useConnectorDetailBreadcrumbs } from "./breadcrumbs";
import { useParams } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";
import { useQuery } from "@tanstack/react-query";
import { serviceConnectorQueries } from "@/data/service-connectors";

export function ConnectorDetailHeader() {
	const { connectorId: id } = useParams() as { connectorId: string };

	return (
		<section className="flex items-center justify-between">
			<div className="group/copybutton flex items-center gap-3">
				<ConnectorImage />
				<div>
					<div className="flex items-center gap-1">
						<p className="text-text-sm text-theme-text-secondary">{id.split("-")[0]}</p>
						<CopyButton copyText={id} />
					</div>
					<ConnectorName />
				</div>
			</div>
		</section>
	);
}

function ConnectorName() {
	const { connectorId } = useParams() as { connectorId: string };
	const connector = useQuery({
		...serviceConnectorQueries.serviceConnectorDetail(connectorId),
		throwOnError: true
	});

	useConnectorDetailBreadcrumbs(connector.data);

	if (connector.isError) return null;
	if (connector.isPending) return <Skeleton className="h-6 w-[100px]" />;
	return (
		<div className="flex items-center gap-1">
			<p className="truncate text-display-xs font-semibold">{connector.data.name}</p>
			<CopyButton copyText={connector.data.name} />
		</div>
	);
}

function ConnectorImage() {
	const { connectorId } = useParams() as { connectorId: string };
	const connector = useQuery({
		...serviceConnectorQueries.serviceConnectorDetail(connectorId),
		throwOnError: true
	});
	if (connector.isError) return null;
	if (connector.isPending) return <Skeleton className="h-8 w-8 shrink-0" />;

	const type = connector.data.body?.connector_type;
	if (!type || typeof type === "string") return null;

	return (
		<div className="flex aspect-square h-8 w-8 shrink-0 items-center justify-center rounded-md bg-theme-surface-secondary">
			<img
				width={24}
				height={24}
				className="shrink-0"
				src={type.logo_url || ""}
				alt={`Icon of component ${connector.data.name}`}
			/>
		</div>
	);
}
