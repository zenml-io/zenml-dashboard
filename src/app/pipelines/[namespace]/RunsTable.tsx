import { usePipelineRunParams } from "./service";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import Refresh from "@/assets/icons/refresh.svg?react";
import { useParams } from "react-router-dom";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { SearchField } from "@/components/SearchField";
import Pagination from "@/components/Pagination";
import { getPipelineDetailColumns } from "./columns";
import { RunsButtonGroup } from "../RunsTab/ButtonGroup";
import { useRunsDataTableContext } from "../RunsTab/RunsDataTableContext";

export function PipelineRunsTable() {
	const { namespace } = useParams() as { namespace: string };
	const params = usePipelineRunParams();
	const cols = getPipelineDetailColumns();
	const { selectedRowIDs } = useRunsDataTableContext();

	const { data, refetch } = useAllPipelineRuns(
		{
			params: {
				pipeline_name: decodeURIComponent(namespace),
				...params,
				sort_by: "desc:updated"
			}
		},
		{ throwOnError: true }
	);

	return (
		<div className="flex flex-col gap-5 p-5">
			<div className="flex items-center justify-between">
				{selectedRowIDs.length ? <RunsButtonGroup /> : <SearchField searchParams={params} />}
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
