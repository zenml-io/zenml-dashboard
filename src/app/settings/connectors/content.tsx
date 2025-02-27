import { ServiceConnectorList } from "./connector-list";
import { SearchBar } from "./search-bar";
import { useConnectorListParams } from "./use-connector-params";
import { ServiceConnectorListQueryParams } from "@/types/service-connectors";

export function ServiceConnectorListContent() {
	const params = useConnectorListParams();

	const queryParams: ServiceConnectorListQueryParams = {
		...params
	};
	return (
		<>
			<SearchBar queryParams={queryParams} />
			<ServiceConnectorList queryParams={queryParams} />
		</>
	);
}
