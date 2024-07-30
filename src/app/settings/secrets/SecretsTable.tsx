import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { AddSecretDialog } from "./AddSecretDialog";
import { useAllSecrets } from "@/data/secrets/secrets-all-query";
import { DataTable } from "@zenml-io/react-component-library";
import { getSecretColumns } from "./columns";
import { useGetWorkSpaceDetail } from "@/data/workspaces/workspace-all-query";
import { useSecretOverviewSearchParams } from "./service";
import { useNavigate } from "react-router-dom";

export default function SecretsTable() {
	const navigate = useNavigate();
	const queryParams = useSecretOverviewSearchParams();
	const { data: secretsData } = useAllSecrets(
		{ params: { ...queryParams, sort_by: "desc:created" } },
		{ throwOnError: true }
	);
	const { data: currentUser } = useCurrentUser();

	const workspaceName = currentUser?.name;
	const isAdmin = currentUser?.body?.is_admin;

	const {
		data: workspaceData,
		isLoading,
		isError
	} = useGetWorkSpaceDetail(workspaceName || "", {
		enabled: !!workspaceName
	});

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
						<DataTable columns={getSecretColumns(navigate)} data={secretsData.items} />
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
