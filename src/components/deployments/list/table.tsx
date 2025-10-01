import { useDeploymentSelectorContext } from "@/components/deployments/selector-context";
import Pagination from "@/components/Pagination";
import { deploymentQueries } from "@/data/deployments";
import { Deployment, DeploymentsListQueryParams } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { ColumnDef } from "@tanstack/react-table";

type Props = {
	params: DeploymentsListQueryParams;
	columns: ColumnDef<Deployment>[];
};

export function PipelineDeploymentsTable({ params, columns }: Props) {
	const { rowSelection, setRowSelection } = useDeploymentSelectorContext();

	const listQuery = useQuery({ ...deploymentQueries.list(params), throwOnError: true });

	if (listQuery.isPending)
		return (
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					<Skeleton className="h-[500px] w-full" />
				</div>

				<Skeleton className="h-[36px] w-[300px]" />
			</div>
		);

	if (listQuery.isError) return <p>Error fetching deployments</p>;

	const data = listQuery.data;

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="w-full">
				<DataTable
					columns={columns}
					data={data.items}
					rowSelection={rowSelection}
					onRowSelectionChange={setRowSelection}
					getRowId={(row) => row.id}
				/>
			</div>

			{data.total_pages > 1 && <Pagination searchParams={params} paginate={data} />}
		</div>
	);
}
