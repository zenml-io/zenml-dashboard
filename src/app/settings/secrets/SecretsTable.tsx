import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { useUserOverviewSearchParams } from "../members/service";
import { AddSecretDialog } from "./AddSecretDialog";
import { useAllSecrets } from "@/data/secrets/secrets-all-query";
import { DataTable } from "@zenml-io/react-component-library";
import { getSecretColumns } from "./columns";
import { usegetWorkSpaceDetail } from "@/data/workspaces/workspace-all-query";

export default function SecretsTable() {
	const queryParams = useUserOverviewSearchParams();
	const { data: currentUser } = useCurrentUser();

	const { data: secretsData } = useAllSecrets();

	const workspaceName = currentUser?.name;
	const isAdmin = currentUser?.body?.is_admin;

	const {
		data: workspaceData,
		isLoading,
		isError
	} = usegetWorkSpaceDetail(workspaceName || "", {
		enabled: !!workspaceName
	});

	console.log(workspaceData, isLoading, isError);

	return (
		<>
			<div className="flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />

				{isAdmin && workspaceName && (
					<>
						{isLoading ? (
							<div>Loading...</div>
						) : isError ? (
							<div>Error loading workspace details.</div>
						) : (
							<AddSecretDialog id={currentUser.id} workspace={workspaceData} />
						)}
					</>
				)}
			</div>
			<div className="flex flex-col items-center gap-5">
				<div className="w-full">
					{secretsData ? (
						<DataTable columns={getSecretColumns()} data={secretsData.items} />
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
