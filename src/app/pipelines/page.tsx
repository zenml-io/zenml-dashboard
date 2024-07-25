import Refresh from "@/assets/icons/refresh.svg?react";
import { PageHeader } from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { pipelineQueries } from "@/data/pipelines";
import { useBreadcrumbsContext } from "@/layouts/AuthenticatedLayout/BreadcrumbsContext";
import { useQuery } from "@tanstack/react-query";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { useEffect } from "react";
import { getPipelineColumns } from "./columns";
import { usePipelineOverviewSearchParams } from "./service";

export default function PipelinesPage() {
	const { setCurrentBreadcrumbData } = useBreadcrumbsContext();
	const queryParams = usePipelineOverviewSearchParams();

	const { data, refetch } = useQuery({
		...pipelineQueries.pipelineList({ ...queryParams, sort_by: "desc:latest_run" })
	});

	useEffect(() => {
		setCurrentBreadcrumbData({ segment: "pipelines", data: null });
	}, []);

	return (
		<div>
			<PageHeader>
				<h1 className="text-display-xs font-semibold">Pipelines</h1>
			</PageHeader>
			<section className="p-5">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-between">
						<SearchField searchParams={queryParams} />
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
								<DataTable columns={getPipelineColumns()} data={data.items} />
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
			</section>
		</div>
	);
}
