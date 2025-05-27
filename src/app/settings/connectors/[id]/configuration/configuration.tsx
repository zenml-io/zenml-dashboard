import { NestedCollapsible } from "@/components/NestedCollapsible";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { extractAuthMethod } from "@/lib/service-connectors";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";

export function ConfigurationPanel() {
	const { connectorId } = useParams() as { connectorId: string };
	const connectorQuery = useQuery({
		...serviceConnectorQueries.serviceConnectorDetail(connectorId),
		throwOnError: true
	});

	if (connectorQuery.isPending) return <Skeleton className="h-[300px] w-full" />;
	if (connectorQuery.isError) return <div>Error</div>;

	const connector = connectorQuery.data;

	const authMethod = extractAuthMethod(connector);
	return (
		<NestedCollapsible
			schema={authMethod?.config_schema}
			title={<p className="text-text-xl">Configuration</p>}
			data={connector.metadata?.configuration}
			isInitialOpen
		/>
	);
}
