import { Box } from "@zenml-io/react-component-library";
import MembersTable from "./MembersTable";
import { useAllMembers } from "@/data/users/users";

export default function MembersPage() {
	const { data } = useAllMembers();
	const users = data?.items;

	return (
		users &&
		users.length && (
			<Box className="flex flex-col gap-4 p-5">
				<h1 className="text-text-xl font-semibold">Members</h1>
				<MembersTable users={users} />
			</Box>
		)
	);
}
