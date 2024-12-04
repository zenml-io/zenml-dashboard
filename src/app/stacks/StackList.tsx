import Plus from "@/assets/icons/plus.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { stackQueries } from "@/data/stacks";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { Button, DataTable, Skeleton } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { useStacklistQueryParams } from "./service";
import { StackListQueryParams } from "../../types/stack";
import { useStackColumns } from "./columns";

type Props = {
	fixedQueryParams?: StackListQueryParams;
};

export function StackList({ fixedQueryParams = {} }: Props) {
	const queryParams = useStacklistQueryParams();
	const columns = useStackColumns();
	const { refetch, data } = useQuery({
		...stackQueries.stackList({ ...queryParams, sort_by: "desc:updated", ...fixedQueryParams }),
		throwOnError: true
	});

	return (
		<section>
			<div className="flex flex-col gap-5">
				<div className="flex flex-wrap items-center justify-between gap-y-4">
					<SearchField searchParams={queryParams} />
					<div className="flex items-center justify-between gap-2">
						<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
							<Refresh className="h-5 w-5 fill-theme-text-brand" />
							Refresh
						</Button>
						<Button size="md" asChild>
							<Link to={routes.stacks.create.index}>
								<Plus className="h-5 w-5 shrink-0 fill-white" />
								<span>New Stack</span>
							</Link>
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
