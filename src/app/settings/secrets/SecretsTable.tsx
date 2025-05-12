import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { secretQueries } from "@/data/secrets";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";
import { secretsColumns } from "./columns";
import { useSecretOverviewSearchParams } from "./service";
import { AddSecretDialog } from "./AddSecretDialog";

export default function SecretsTable() {
	const queryParams = useSecretOverviewSearchParams();
	const { data: secretsData } = useQuery({
		...secretQueries.secretList({ ...queryParams, sort_by: "desc:created" }),
		throwOnError: true
	});

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />
				<AddSecretDialog />
			</div>
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{secretsData ? (
						<DataTable columns={secretsColumns} data={secretsData.items} />
					) : (
						<Skeleton className="h-[250px] w-full" />
					)}
				</div>
				{secretsData ? (
					secretsData.total_pages > 1 && (
						<Pagination searchParams={queryParams} paginate={secretsData} />
					)
				) : (
					<Skeleton className="h-[36px] w-[300px]" />
				)}
			</div>
		</>
	);
}
