import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useAllMembers } from "@/data/users/users-all-query";
import { DataTable, Skeleton } from "@zenml-io/react-component-library";
import { AddMemberDialog } from "./AddMemberDialog";
import { columns } from "./columns";
import { useUserOverviewSearchParams } from "./service";
import Pagination from "@/components/Pagination";

export default function MembersTable() {
	const queryParams = useUserOverviewSearchParams();
	const { data, isError } = useAllMembers(
		{ params: { ...queryParams, sort_by: "desc:created" } },
		{ throwOnError: true }
	);
	const {
		data: currentUser,
		isPending: currentUserPending,
		isError: currentUserError
	} = useCurrentUser();

	if (isError || currentUserError) return null;
	if (currentUserPending) return <Skeleton className="h-[350px]" />;

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />

				<AddMemberDialog />
			</div>
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{data ? (
						<DataTable
							columns={columns({ isAdmin: currentUser?.body?.is_admin })}
							data={data.items}
						/>
					) : (
						<Skeleton className="h-[250px] w-full" />
					)}
				</div>
				{data ? (
					data.total_pages > 1 && <Pagination searchParams={queryParams} paginate={data} />
				) : (
					<Skeleton className="h-[36px] w-[300px]" />
				)}
			</div>
		</>
	);
}
