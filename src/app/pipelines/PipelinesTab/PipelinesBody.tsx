import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { pipelineQueries } from "@/data/pipelines";
import { useQuery } from "@tanstack/react-query";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { PipelinesButtonGroup } from "./ButtonGroup";
import { getPipelineColumns } from "./columns";
import { usePipelineSelectorContext } from "./PipelineSelectorContext";
import { usePipelineOverviewSearchParams } from "./service";

export function PipelinesBody() {
	const queryParams = usePipelineOverviewSearchParams();
	const { selectedRowCount, rowSelection, setRowSelection } = usePipelineSelectorContext();
	const { data, refetch } = useQuery({
		...pipelineQueries.pipelineList({ ...queryParams, sort_by: "desc:latest_run" }),
		throwOnError: true
	});

	return (
		<div className="flex flex-col gap-5 pt-5">
			<div className="flex items-center justify-between">
				{selectedRowCount ? <PipelinesButtonGroup /> : <SearchField searchParams={queryParams} />}
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
							getRowId={(row) => row.id}
							columns={getPipelineColumns()}
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
