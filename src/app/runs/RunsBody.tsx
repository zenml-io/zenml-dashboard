import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { useAllPipelineRuns } from "@/data/pipeline-runs/all-pipeline-runs-query";
import { PipelineRunOvervieweParams } from "@/types/pipeline-runs";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { RunsButtonGroup } from "./ButtonGroup";
import { runsColumns } from "./columns";
import { useRunsSelectorContext } from "./RunsSelectorContext";
import { useRunsOverviewSearchParams } from "./service";

type Props = {
	fixedQueryParams?: PipelineRunOvervieweParams;
};

export function RunsBody({ fixedQueryParams = {} }: Props) {
	const { selectedRowCount, rowSelection, setRowSelection } = useRunsSelectorContext();
	const queryParams = useRunsOverviewSearchParams();
	const { data, refetch } = useAllPipelineRuns({
		params: {
			...queryParams,
			sort_by: "desc:updated",
			...fixedQueryParams
		}
	});

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between">
				{selectedRowCount ? <RunsButtonGroup /> : <SearchField searchParams={queryParams} />}
				<div className="flex justify-between">
					<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
						<Refresh className="h-5 w-5 fill-theme-text-brand" />
						Refresh
					</Button>
				</div>
			</div>
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{data ? (
						<DataTable
							rowSelection={rowSelection}
							onRowSelectionChange={setRowSelection}
							columns={runsColumns}
							getRowId={(row) => row.id}
							data={data.items}
						/>
					) : (
						<Skeleton className="h-[500px] w-full" />
					)}
				</div>
				{data ? (
					data.total_pages > 1 && <Pagination searchParams={queryParams} paginate={data} />
				) : (
					<Skeleton className="h-[36px] w-[300px]" />
				)}
			</div>
		</div>
	);
}
