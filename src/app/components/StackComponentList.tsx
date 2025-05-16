import Plus from "@/assets/icons/plus.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { componentQueries } from "@/data/components";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@zenml-io/react-component-library";
import { Button, Skeleton } from "@zenml-io/react-component-library/components/server";
import { Link } from "react-router-dom";
import { getComponentList } from "./columns";
import { useComponentlistQueryParams } from "./service";
import { StackComponentListParams } from "@/types/components";
import { useComponentSelectorContext } from "./selector-context";
import { ComponentButtonGroup } from "./button-group";

type Props = {
	fixedQueryParams?: StackComponentListParams;
	displayCreateComponent?: boolean;
};

export function StackComponentList({ fixedQueryParams, displayCreateComponent = true }: Props) {
	const queryParams = useComponentlistQueryParams();
	const { rowSelection, setRowSelection, selectedRowCount } = useComponentSelectorContext();

	const componentList = useQuery({
		...componentQueries.componentList({
			...queryParams,
			...fixedQueryParams,
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
						{selectedRowCount >= 1 ? (
							<ComponentButtonGroup />
						) : (
							<SearchField searchParams={queryParams} />
						)}
					</div>

					<div className="flex items-center justify-between gap-2">
						<Button intent="primary" emphasis="subtle" size="md" onClick={() => refetch()}>
							<Refresh className="h-5 w-5 fill-theme-text-brand" />
							Refresh
						</Button>
						{displayCreateComponent && (
							<Button size="md" asChild>
								<Link to={routes.components.create}>
									<Plus className="h-5 w-5 shrink-0 fill-white" />
									<span>New Component</span>
								</Link>
							</Button>
						)}
					</div>
				</div>

				<div className="flex flex-col items-center gap-5">
					<div className="w-full">
						{data ? (
							<DataTable
								getRowId={(row) => row.id}
								rowSelection={rowSelection}
								onRowSelectionChange={setRowSelection}
								columns={columns}
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
		</section>
	);
}
