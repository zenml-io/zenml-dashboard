import { SearchField } from "@/components/SearchField";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { ServiceConnectorListQueryParams } from "@/types/service-connectors";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library";
import Refresh from "@/assets/icons/refresh.svg?react";
import { NewConnectorButton } from "./new-connector-button";
import { useConnectorSelectorContext } from "./selector-context";
import { ConnectorButtonGroup } from "./button-group";

type Props = {
	queryParams: ServiceConnectorListQueryParams;
};

export function SearchBar({ queryParams }: Props) {
	const { selectedRowCount } = useConnectorSelectorContext();
	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				{selectedRowCount > 0 ? (
					<ConnectorButtonGroup />
				) : (
					<SearchField searchParams={queryParams} />
				)}
				<div className="flex items-center gap-2">
					<ServiceConnectorRefreshButton queryParams={queryParams} />
					<NewConnectorButton />
				</div>
			</div>
		</>
	);
}

type RefreshButtonProps = {
	queryParams: ServiceConnectorListQueryParams;
};

export function ServiceConnectorRefreshButton({ queryParams }: RefreshButtonProps) {
	const { refetch } = useQuery(serviceConnectorQueries.serviceConnectorList(queryParams));
	return (
		<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
			<Refresh className="h-5 w-5 fill-theme-text-brand" />
			Refresh
		</Button>
	);
}
