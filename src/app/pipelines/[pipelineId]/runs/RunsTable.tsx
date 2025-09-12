import Pagination from "@/components/Pagination";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";
import { getPipelineDetailColumns } from "./columns";

type Props = {
	params: PipelineRunOvervieweParams;
};

export function PipelineRunsTable({ params }: Props) {
	const cols = getPipelineDetailColumns();

	const { data } = useAllPipelineRuns({ params }, { throwOnError: true });

	return (
		<div className="flex flex-col items-center gap-5">
			<div className="w-full">
				{data ? (
					<DataTable columns={cols} data={data.items} />
				) : (
					<Skeleton className="h-[500px] w-full" />
				)}
			</div>
			{data ? (
				data.total_pages > 1 && <Pagination searchParams={params} paginate={data} />
			) : (
				<Skeleton className="h-[36px] w-[300px]" />
			)}
		</div>
	);
}
