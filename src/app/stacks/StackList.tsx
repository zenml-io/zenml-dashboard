import { stackQueries } from "@/data/stacks";
import Refresh from "@/assets/icons/refresh.svg?react";
import { useQuery } from "@tanstack/react-query";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import Pagination from "@/components/Pagination";
import { getStackColumns } from "./columns";
import { useStacklistQueryParams } from "./service";
import { SearchField } from "@/components/SearchField";

export function StackList() {
	const queryParams = useStacklistQueryParams();
	const { refetch, data } = useQuery({
		...stackQueries.stackList({ ...queryParams, sort_by: "desc:updated" }),
		throwOnError: true
	});

	return (
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
							<DataTable columns={getStackColumns()} data={data.items} />
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
	);
}
