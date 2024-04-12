import { useAllMembers } from "@/data/users/users-all-query";
import { DataTable, Input, Skeleton } from "@zenml-io/react-component-library";
import { useState } from "react";
import { AddMemberDialog } from "./AddMemberDialog";
import { columns } from "./columns";

export default function MembersTable() {
	const [filter, setFilter] = useState("");
	const { data, isPending, isError } = useAllMembers({ throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[350px]" />;

	// TODO this needs to happen on the server side
	function filterData() {
		return data?.items.filter((member) => {
			return member?.name?.toLowerCase().includes(filter.toLowerCase());
		});
	}

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<Input
					onChange={(e) => setFilter(e.target.value)}
					inputSize="sm"
					placeholder="Find a user"
				/>
				<AddMemberDialog />
			</div>
			<div className="w-full">
				<DataTable columns={columns()} data={filterData() || []} />
			</div>
		</>
	);
}
