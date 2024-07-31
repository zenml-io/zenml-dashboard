import { SearchField } from "@/components/SearchField";
import { useCurrentUser } from "@/data/users/current-user-query";
import { Button, DataTable } from "@zenml-io/react-component-library";
import { getSecretDetailColumn } from "./columns";
import { useSecretOverviewSearchParams } from "../service";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
import { EditSecretDialog } from "../EditSecretDialog";
import { useState } from "react";

export default function SecretDetailTable({ secretId }: { secretId: string }) {
	const queryParams = useSecretOverviewSearchParams();
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	const { data: secretDetail } = useGetSecretDetail(secretId);

	const { data: currentUser } = useCurrentUser();

	const isAdmin = currentUser?.body?.is_admin || undefined;

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
			<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
				<SearchField searchParams={queryParams} />

				<Button
					size="sm"
					intent="primary"
					onClick={() => {
						setEditDialogOpen(true);
					}}
				>
					Add key
				</Button>
			</div>

			{isAdmin && (
				<EditSecretDialog
					secretId={secretId}
					isOpen={editDialogOpen}
					onClose={() => {
						setEditDialogOpen(false);
					}}
					isSecretNameEditable={false}
					dialogTitle="Add keys"
				/>
			)}

			<div className="w-full">
				{secretDetail ? (
					<DataTable columns={getSecretDetailColumn(isAdmin)} data={secretDetailData} />
				) : (
					<></>
				)}
			</div>
		</>
	);
}
