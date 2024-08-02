import { useCurrentUser } from "@/data/users/current-user-query";
import { Button, DataTable, Input } from "@zenml-io/react-component-library";
import { getSecretDetailColumn } from "./columns";
import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
import { EditSecretDialog } from "../EditSecretDialog";
import { useState, useMemo } from "react";

export default function SecretDetailTable({ secretId }: { secretId: string }) {
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const { data: secretDetail } = useGetSecretDetail(secretId);
	const { data: currentUser } = useCurrentUser();

	const isAdmin = currentUser?.body?.is_admin;

	// Prepare data for DataTable
	const secretDetailData = useMemo(() => {
		return secretDetail
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
	}, [secretDetail]);

	// Filter data based on search input
	const filteredData = useMemo(() => {
		if (!searchTerm) return secretDetailData;
		return secretDetailData.filter((item) =>
			item.key.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, secretDetailData]);

	return (
		<>
			<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
				<Input
					type="text"
					placeholder="Search by key..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					inputSize="md"
				/>

				<Button size="sm" intent="primary" onClick={() => setEditDialogOpen(true)}>
					Edit Keys
				</Button>
			</div>

			{isAdmin && (
				<EditSecretDialog
					secretId={secretId}
					isOpen={editDialogOpen}
					onClose={() => setEditDialogOpen(false)}
					isSecretNameEditable={false}
					dialogTitle="Edit keys"
				/>
			)}

			<div className="w-full">
				{secretDetail && (
					<DataTable columns={getSecretDetailColumn(secretId)} data={filteredData} />
				)}
			</div>
		</>
	);
}
