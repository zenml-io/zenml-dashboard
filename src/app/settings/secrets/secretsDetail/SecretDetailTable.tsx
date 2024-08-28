import { useGetSecretDetail } from "@/data/secrets/get-secret-detail";
import { Button, DataTable, Dialog, DialogTrigger, Input } from "@zenml-io/react-component-library";
import { useMemo, useState } from "react";
import { EditSecretDialog } from "../EditSecretDialog";
import { getSecretDetailColumn } from "./columns";

export default function SecretDetailTable({ secretId }: { secretId: string }) {
	const [searchTerm, setSearchTerm] = useState("");

	const { data: secretDetail } = useGetSecretDetail(secretId);

	// Prepare data for DataTable
	const secretDetailData = useMemo(() => {
		return secretDetail
			? Object.entries(secretDetail.body?.values || []).map(([key, value]) => ({
					id: secretDetail.id,
					name: secretDetail.name,
					key,
					value,
					scope: secretDetail.body?.scope,
					created: secretDetail.body?.created,
					updated: secretDetail.body?.updated,
					user: secretDetail.body?.user
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
				<Dialog>
					<DialogTrigger asChild>
						<Button size="sm" intent="primary">
							Edit Keys
						</Button>
					</DialogTrigger>
					<EditSecretDialog
						secretId={secretId}
						isSecretNameEditable={false}
						dialogTitle="Edit keys"
					/>
				</Dialog>
			</div>
			<div className="w-full">
				{secretDetail && (
					<DataTable columns={getSecretDetailColumn(secretId)} data={filteredData} />
				)}
			</div>
		</>
	);
}
