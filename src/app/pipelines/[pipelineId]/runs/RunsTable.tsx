import { useRunsSelectorContext } from "@/app/runs/RunsSelectorContext";
import Pagination from "@/components/Pagination";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { PipelineRun, PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";

type Props = {
	params: PipelineRunOvervieweParams;
	columns: ColumnDef<PipelineRun>[];
};

export function PipelineRunsTable({ params, columns }: Props) {
	const { rowSelection, setRowSelection } = useRunsSelectorContext();

	const pipelineRunsQuery = useAllPipelineRuns({ params }, { throwOnError: true });

	if (pipelineRunsQuery.isPending) {
		return (
			<div className="flex flex-col items-center gap-5">
				<Skeleton className="h-[500px] w-full" />
				<Skeleton className="h-[36px] w-[300px]" />
			</div>
		);
	}

	if (pipelineRunsQuery.isError) {
		return <p>Error fetching pipeline runs</p>;
	}

	const data = pipelineRunsQuery.data;

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="w-full">
				<DataTable
					rowSelection={rowSelection}
					onRowSelectionChange={setRowSelection}
					getRowId={(row) => row.id}
					columns={columns}
					data={data.items}
				/>
			</div>
			{data.total_pages > 1 && <Pagination searchParams={params} paginate={data} />}
		</div>
	);
}
