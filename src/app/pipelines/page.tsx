import { PageHeader } from "@/components/PageHeader";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { usePipelineOverviewSearchParams } from "./service";
import { useAllPipelineNamespaces } from "@/data/pipelines/pipeline-namespaces-query";
import { getPipelineColumns } from "./columns";

export default function PipelinesPage() {
	const queryParams = usePipelineOverviewSearchParams();

	const { data, refetch } = useAllPipelineNamespaces({
		params: {
			...queryParams,
			sort_by: "desc:updated"
		}
	});

	return (
		<div>
			<PageHeader>
				<h1 className="text-display-xs font-semibold">Pipelines</h1>
			</PageHeader>
			<section className="p-5">
				<div className="flex flex-col gap-5">
					<div className="flex items-center justify-between">
						{/* <SearchField searchParams={queryParams} /> */}
						<div className="flex justify-between">
							<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
								{/* <Refresh className="h-5 w-5 fill-theme-text-brand" /> */}
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
						{/* {data ? (
							data.total_pages > 1 && <Pagination searchParams={queryParams} paginate={data} />
						) : (
							<Skeleton className="h-[36px] w-[300px]" />
						)} */}
					</div>
				</div>
			</section>
		</div>
	);
}
