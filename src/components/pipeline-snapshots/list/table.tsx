import Pagination from "@/components/Pagination";
import { useSnapshotSelectorContext } from "@/components/pipeline-snapshots/selector-context";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { PipelineSnapshot, PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";

type Props = {
	params: PipelineSnapshotListQueryParams;
	columns: ColumnDef<PipelineSnapshot>[];
};

export function PipelineSnapshotsTable({ params, columns }: Props) {
	const { rowSelection, setRowSelection } = useSnapshotSelectorContext();

	const listQuery = useQuery({ ...pipelineSnapshotQueries.list(params), throwOnError: true });

	if (listQuery.isPending)
		return (
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					<Skeleton className="h-[500px] w-full" />
				</div>

				<Skeleton className="h-[36px] w-[300px]" />
			</div>
		);

	if (listQuery.isError) return <p>Error fetching snapshots</p>;

	const data = listQuery.data;

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="w-full">
				{data.items.length ? (
					<DataTable
						columns={columns}
						data={data.items}
						rowSelection={rowSelection}
						onRowSelectionChange={setRowSelection}
						getRowId={(row) => row.id}
					/>
				) : (
					<p className="py-10 text-center text-text-md text-theme-text-secondary">
						No snapshots found
					</p>
				)}
			</div>

			{data.total_pages > 1 && <Pagination searchParams={params} paginate={data} />}
		</div>
	);
}
