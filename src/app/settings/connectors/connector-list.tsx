import { ServiceConnectorListQueryParams } from "@/types/service-connectors";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useServiceConnectorListColumns } from "./use-columns";
import { DataTable } from "@zenml-io/react-component-library/components/client";
import Pagination from "@/components/Pagination";
import { serviceConnectorQueries } from "@/data/service-connectors";
import { useQuery } from "@tanstack/react-query";

type Props = {
	queryParams: ServiceConnectorListQueryParams;
};

export function ServiceConnectorList({ queryParams }: Props) {
	const connectorsQuery = useQuery({
		...serviceConnectorQueries.serviceConnectorList(queryParams),
		throwOnError: true
	});

	const columns = useServiceConnectorListColumns();

	if (connectorsQuery.isPending)
		return (
			<div className="space-y-5">
				<Skeleton className="h-[300px] w-full" />
				<Skeleton className="mx-auto h-[36px] w-[300px]" />
			</div>
		);
	if (connectorsQuery.isError) return null;

	const connectors = connectorsQuery.data;

	return (
		<section className="flex flex-col gap-5">
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					<DataTable columns={columns} data={connectors.items} />
				</div>
				{connectors.total_pages > 1 && (
					<Pagination searchParams={queryParams} paginate={connectors} />
				)}
			</div>
		</section>
	);
}
