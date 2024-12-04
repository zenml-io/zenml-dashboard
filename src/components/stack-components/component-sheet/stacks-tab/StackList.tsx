import Refresh from "@/assets/icons/refresh.svg?react";
import { stackQueries } from "@/data/stacks";
import { StackListQueryParams } from "@/types/stack";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@zenml-io/react-component-library";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import Pagination from "../../../Pagination";
import { SearchField } from "../../../SearchField";
import { getStackColumnsPanel } from "./columns";

type Props = {
	componentId: string;
};

export function StackList({ componentId }: Props) {
	const [search, setSearch] = useState<string | undefined>(undefined);
	const [page, setPage] = useState(1);

	const inlineQueries: StackListQueryParams = {
		name: search,
		page
	};

	const { refetch, data } = useQuery(
		stackQueries.stackList({
			...inlineQueries,
			component_id: componentId,
			sort_by: "desc:updated"
		})
	);

	return (
		<section>
			<div className="flex flex-col gap-5">
				<div className="flex flex-wrap items-center justify-between gap-y-4">
					<div className="flex items-center gap-2">
						<SearchField
							inMemoryHandler={(val) => {
								setPage(1);
								if (!val) setSearch(undefined);
								setSearch(`contains:${val}`);
							}}
							searchParams={{}}
						/>
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
							<DataTable columns={getStackColumnsPanel()} data={data.items} />
						) : (
							<Skeleton className="h-[500px] w-full" />
						)}
					</div>
					{data ? (
						data.total_pages > 1 && (
							<Pagination inMemoryHandler={setPage} searchParams={{}} paginate={data} />
						)
					) : (
						<Skeleton className="h-[36px] w-[300px]" />
					)}
				</div>
			</div>
		</section>
	);
}
