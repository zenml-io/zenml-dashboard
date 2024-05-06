import { Box } from "@zenml-io/react-component-library";
import MembersTable from "./MembersTable";

export default function MembersPage() {
	return (
		<Box className="flex flex-col gap-4 p-5">
			<h1 className="text-text-xl font-semibold">Members</h1>
			<MembersTable />
		</Box>
	);
}
