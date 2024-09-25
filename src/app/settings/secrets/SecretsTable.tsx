import Pagination from "@/components/Pagination";
import { SearchField } from "@/components/SearchField";
import { secretQueries } from "@/data/secrets";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";
import { workspaceQueries } from "../../../data/workspaces";
import { AddSecretDialog } from "./AddSecretDialog";
import { secretsColumns } from "./columns";
import { useSecretOverviewSearchParams } from "./service";

export default function SecretsTable() {
	const queryParams = useSecretOverviewSearchParams();
	const { data: secretsData } = useQuery({
		...secretQueries.secretList({ ...queryParams, sort_by: "desc:created" }),
		throwOnError: true
	});
	const { data: currentUser } = useCurrentUser();

	const userId = currentUser?.id || "";

	const {
		data: workspaceData,
		isLoading,
		isError,
		isSuccess
	} = useQuery({ ...workspaceQueries.workspaceDetail("default") });

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />

				{isLoading ? (
					<div>Loading...</div>
				) : isError ? (
					<div>Error loading workspace details.</div>
				) : (
					isSuccess && <AddSecretDialog id={userId} workspace={workspaceData} />
				)}
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
