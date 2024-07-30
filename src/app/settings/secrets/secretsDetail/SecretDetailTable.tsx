import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { AddSecretDialog } from "../AddSecretDialog";
import { DataTable } from "@zenml-io/react-component-library";
import { getSecretDetailColumn } from "./columns";
import { useGetWorkSpaceDetail } from "@/data/workspaces/workspace-all-query";
import { useSecretOverviewSearchParams } from "../service";
import { useNavigate } from "react-router-dom";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";

export default function SecretDetailTable({ secretId }: { secretId: string }) {
	const navigate = useNavigate();
	const queryParams = useSecretOverviewSearchParams();

	const { data: secretDetail } = useGetSecretDetail(secretId);

	const { data: currentUser } = useCurrentUser();

	const workspaceName = currentUser?.name;
	const isAdmin = currentUser?.body?.is_admin || undefined;

	const {
		data: workspaceData,
		isLoading,
		isError
	} = useGetWorkSpaceDetail(workspaceName || "", {
		enabled: !!workspaceName
	});
	// Prepare data for DataTable
	const secretDetailData = secretDetail
		? Object.entries(secretDetail.body.values).map(([key, value]) => ({
				id: secretDetail.id,
				name: secretDetail.name,
				key,
				value,
				scope: secretDetail.body.scope,
				created: secretDetail.body.created,
				updated: secretDetail.body.updated,
				user: secretDetail.body.user
			}))
		: [];

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
					{secretDetail ? (
						<DataTable columns={getSecretDetailColumn(isAdmin)} data={secretDetailData} />
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
}
