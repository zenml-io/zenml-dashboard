import { secretQueries } from "@/data/secrets";
import { useQuery } from "@tanstack/react-query";
import {
	Button,
	DataTable,
	Dialog,
	DialogTrigger,
	Input,
	Skeleton
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { EditSecretDialog } from "../EditSecretDialog";
import { getSecretDetailColumn } from "./columns";

export default function SecretDetailTable({ secretId }: { secretId: string }) {
	const [searchTerm, setSearchTerm] = useState("");

	const secretDetail = useQuery({ ...secretQueries.secretDetail(secretId) });

	if (secretDetail.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (secretDetail.isError) return <div>{secretDetail.error.message}</div>;

	const keyValues = Object.entries(
		(secretDetail.data?.body?.values as Record<string, string>) || {}
	).map(([key, value]) => ({
		key,
		value
	}));

	const filteredData = keyValues.filter((item) =>
		item.key.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
				<Input
					type="text"
					placeholder="Search Keys..."
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
				<DataTable
					columns={getSecretDetailColumn(secretId, secretDetail.data.name)}
					data={filteredData}
				/>
			</div>
		</>
	);
}
