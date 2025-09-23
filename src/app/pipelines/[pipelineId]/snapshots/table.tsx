import Pagination from "@/components/Pagination";
import { useSnapshotSelectorContext } from "@/components/pipeline-snapshots/selector-context";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { PipelineSnapshotListQueryParams } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@zenml-io/react-component-library/components/client";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useSnapshotColumns } from "./columns";

type Props = {
	params: PipelineSnapshotListQueryParams;
};

export function PipelineSnapshotsTable({ params }: Props) {
	const { rowSelection, setRowSelection } = useSnapshotSelectorContext();

	const cols = useSnapshotColumns();

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
				<DataTable
					columns={cols}
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
