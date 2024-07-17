import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useUserOverviewSearchParams } from "../members/service";
import { AddSecretDialog } from "./AddSecretDialog";
import { useAllSecrets } from "@/data/secrets/secrets-all-query";
import { DataTable } from "@zenml-io/react-component-library";
import { getSecretColumns } from "./columns";

export default function SecretsTable() {
	const queryParams = useUserOverviewSearchParams();
	const { data: currentUser } = useCurrentUser();

	const { data } = useAllSecrets();
	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />

				{currentUser?.body?.is_admin && <AddSecretDialog />}
			</div>
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{data ? <DataTable columns={getSecretColumns()} data={data.items} /> : <></>}
				</div>
			</div>
		</>
	);
}
