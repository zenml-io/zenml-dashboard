import React, { useState } from "react"; // Import useState for local state
import { ColumnDef } from "@tanstack/react-table";
import SecretsDropdown from "../SecretsDropdown";
import KeyIcon from "@/assets/icons/key-icon.svg?react";
import InfoIcon from "@/assets/icons/info-icon.svg?react";
import EyeIcon from "@/assets/icons/eye.svg?react";

const ValueCell: React.FC<{ value: unknown }> = ({ value }) => {
	const [isVisible, setIsVisible] = useState(false);
	const valueStr = typeof value === "string" ? value : "";
	const dots = "•".repeat(valueStr.length);

	return (
		<div className="flex cursor-pointer items-center gap-2 space-x-2">
			<EyeIcon onClick={() => setIsVisible(!isVisible)} className="cursor-pointer" />
			<span>{isVisible ? valueStr : dots}</span>
		</div>
	);
};

export function getSecretDetailColumn(isAdmin: any): ColumnDef<any>[] {
	const columns: ColumnDef<any>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<input
					type="checkbox"
					style={{ borderRadius: 5 }}
					{...{
						checked: table.getIsAllPageRowsSelected(),
						onChange: table.getToggleAllPageRowsSelectedHandler()
					}}
				/>
			),
			cell: ({ row }) => (
				<input
					type="checkbox"
					style={{ borderRadius: 5 }}
					{...{
						checked: row.getIsSelected(),
						onChange: row.getToggleSelectedHandler()
					}}
				/>
			)
		},
		{
			id: "key",
			header: "Key",
			accessorKey: "key",
			cell: ({ row }) => (
				<div className="flex cursor-pointer items-center space-x-2">
					<KeyIcon />
					<div className="flex flex-col">
						<div className="flex flex-row space-x-1">
							<span className="text-text-md font-semibold text-theme-text-primary">
								{row.getValue("key")}
							</span>
							<InfoIcon />
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

	if (isAdmin) {
		columns.push({
			id: "actions",
			header: "Actions",
			cell: ({ row }) => <SecretsDropdown secretId={row.original.id} />
		});
	}

	return columns;
}
