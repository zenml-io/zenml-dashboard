import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { useAllPipelineRuns } from "../../../data/pipeline-runs/all-pipeline-runs-query";
import { runsColumns } from "./columns";
import { useRunsOverviewSearchParams } from "./service";

export function RunsBody() {
	const queryParams = useRunsOverviewSearchParams();
	const { data, refetch } = useAllPipelineRuns({
		params: {
			...queryParams,
			sort_by: "desc:updated"
		}
	});

	return (
		<div className="mt-5 flex flex-col gap-5">
			<div className="flex items-center justify-between">
				{/* {selectedRuns.length ? (
			<ButtonGroup />
		) : (
			<SearchField searchParams={updatedQueryParams} />
		)}{" "} */}
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
						<DataTable columns={runsColumns} data={data.items} />
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
