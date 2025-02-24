import { Button } from "@zenml-io/react-component-library/components/server";
import Refresh from "@/assets/icons/refresh.svg?react";
import { useQuery } from "@tanstack/react-query";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { ServiceConnectorListQueryParams } from "@/types/service-connectors";

type Props = {
	queryParams: ServiceConnectorListQueryParams;
};

export function ServiceConnectorRefreshButton({ queryParams }: Props) {
	const { refetch } = useQuery(serviceConnectorQueries.serviceConnectorList(queryParams));
	return (
		<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
			<Refresh className="h-5 w-5 fill-theme-text-brand" />
			Refresh
		</Button>
	);
}
