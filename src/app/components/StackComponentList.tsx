import Refresh from "@/assets/icons/refresh.svg?react";

import { componentQueries } from "@/data/components";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { getComponentList } from "./columns";
import { useComponentlistQueryParams } from "./service";
import { SearchField } from "../../components/SearchField";
import { DataTable } from "@zenml-io/react-component-library";
import Pagination from "../../components/Pagination";

export function StackComponentList() {
	const queryParams = useComponentlistQueryParams();

	const componentList = useQuery({
		...componentQueries.componentList({
			...queryParams,
			sort_by: "desc:updated"
		}),
		throwOnError: true
	});
	const columns = getComponentList();
	if (componentList.isError) return null;
	const { data, refetch } = componentList;

	return (
		<section>
			<div className="flex flex-col gap-5">
				<div className="flex flex-wrap items-center justify-between gap-y-4">
					<div className="flex items-center gap-2">
						<SearchField searchParams={queryParams} />
					</div>

					<div className="flex items-center justify-between gap-2">
						<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
							<Refresh className="h-5 w-5 fill-theme-text-brand" />
							Refresh
						</Button>
					</div>
				</div>

				<div className="flex flex-col items-center gap-5">
					<div className="w-full">
						{data ? (
							<DataTable columns={columns} data={data.items} />
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
