import { SearchBar } from "./searchbar";
import { ServiceConnectorListQueryParams } from "@/types/service-connectors";
import { useConnectorListParams } from "./use-connector-params";
import { ServiceConnectorList } from "./connector-list";

export function ServiceConnectorListContent() {
	const params = useConnectorListParams();

	const queryParams: ServiceConnectorListQueryParams = {
		...params,
		sort_by: "desc:updated"
	};
	return (
		<>
			<SearchBar queryParams={queryParams} />
			<ServiceConnectorList queryParams={queryParams} />
		</>
	);
}
