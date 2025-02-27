import { SearchField } from "@/components/SearchField";
import { ServiceConnectorListQueryParams } from "@/types/service-connectors";
import { ServiceConnectorRefreshButton } from "./refresh-button";

type Props = {
	queryParams: ServiceConnectorListQueryParams;
};

export function SearchBar({ queryParams }: Props) {
	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<div className="flex items-center gap-2">
					<SearchField searchParams={queryParams} />
				</div>

				<ServiceConnectorRefreshButton queryParams={queryParams} />
			</div>
		</>
	);
}
