import React, { useState } from "react"; // Import useState for local state
import { ColumnDef } from "@tanstack/react-table";
import KeyIcon from "@/assets/icons/key-icon.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";
import SecretTableDropDown from "./SecretTableDropDown";

const ValueCell: React.FC<{ value: unknown }> = ({ value }) => {
	const [isVisible, setIsVisible] = useState(false);
	const valueStr = typeof value === "string" ? value : "";
	const dots = "•".repeat(valueStr.length);

	return (
		<div className="flex  items-center gap-2 space-x-2">
			<EyeIcon
				onClick={() => setIsVisible(!isVisible)}
				className="h-4 w-4 flex-shrink-0 cursor-pointer"
			/>
			<span>{isVisible ? valueStr : dots}</span>
		</div>
	);
};

export function getSecretDetailColumn(secretId: any): ColumnDef<any>[] {
	const columns: ColumnDef<any>[] = [
		{
			id: "key",
			header: "Key",
			accessorKey: "key",
			cell: ({ row }) => (
				<div className="flex items-center space-x-2">
					<KeyIcon className="h-4 w-4 flex-shrink-0 cursor-pointer" />
					<div className="flex flex-col">
						<div className="flex flex-row space-x-1">
							<span className="text-text-md font-semibold text-theme-text-primary">
								{row.getValue("key")}
							</span>
						</div>
					</div>
				</div>
			)
		},
		{
			id: "value",
			header: "Value",
			accessorKey: "value",
			cell: ({ row }) => <ValueCell value={row.getValue("value")} />
		}
	];

	columns.push({
		id: "actions",
		header: "Actions",
		cell: ({ row }) => <SecretTableDropDown secretId={secretId} keyName={row.getValue("key")} />
	});

	return columns;
}
