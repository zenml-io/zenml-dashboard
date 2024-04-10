import { useState } from "react";
import { columns } from "./columns";
import { DataTable, Input } from "@zenml-io/react-component-library";
import { User } from "@/types/user";

type Props = {
	users: User[];
};

export default function MembersTable({ users }: Props) {
	const [filter, setFilter] = useState("");

	function filterData() {
		return users.filter((member) => {
			return (
				member?.name?.toLowerCase().includes(filter.toLowerCase()) ||
				member?.body?.email_opted_in?.toLowerCase().includes(filter.toLowerCase())
			);
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
				{/* <AddMemberDialog users={noTenantMembers} /> */}
			</div>
			<div className="w-full">
				<DataTable columns={columns()} data={filterData()} />
			</div>
		</>
	);
}
