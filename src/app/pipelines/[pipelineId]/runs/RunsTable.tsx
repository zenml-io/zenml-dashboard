import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { RunsButtonGroup } from "../../../runs/ButtonGroup";
import { useRunsSelectorContext } from "../../../runs/RunsSelectorContext";
import { getPipelineDetailColumns } from "./columns";
import { usePipelineRunParams } from "./service";

export function PipelineRunsTable() {
	const { pipelineId } = useParams() as { pipelineId: string };
	const params = usePipelineRunParams();
	const cols = getPipelineDetailColumns();
	const { selectedRowCount } = useRunsSelectorContext();

	const { data, refetch } = useAllPipelineRuns(
		{
			params: {
				pipeline_id: pipelineId,
				...params,
				sort_by: "desc:updated"
			}
		},
		{ throwOnError: true }
	);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between">
				{selectedRowCount ? <RunsButtonGroup /> : <SearchField searchParams={params} />}
				<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
					<Refresh className="h-5 w-5 fill-theme-text-brand" />
					Refresh
				</Button>
			</div>
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
		</div>
	);
}
