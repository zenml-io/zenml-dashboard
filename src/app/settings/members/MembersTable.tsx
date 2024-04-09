import { useState } from "react";
import { columns } from "./columns";
import { DataTable, Input } from "@zenml-io/react-component-library";

type Props = {
	members: any;
	// members: TenantMember[];
	// orgMembers: OrganizationMember[];
};

export default function MembersTable({ members }: Props) {
	const [filter, setFilter] = useState("");
	// const { tenantID } = useParams() as { tenantID: string };

	function filterData() {
		return members.filter((member: { name: string; email: string }) => {
			return (
				member?.name?.toLowerCase().includes(filter.toLowerCase()) ||
				member?.email.toLowerCase().includes(filter.toLowerCase())
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
				{/* <AddMemberDialog orgId={orgId} isTenant members={noTenantMembers} /> */}
			</div>
			<div className="w-full">
				<DataTable columns={columns({ tenantId: "tenantID" })} data={filterData()} />
			</div>
		</>
	);
}
