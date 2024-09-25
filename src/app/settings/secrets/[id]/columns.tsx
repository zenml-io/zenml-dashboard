import EyeIcon from "@/assets/icons/eye.svg?react";
import KeyIcon from "@/assets/icons/key-icon.svg?react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react"; // Import useState for local state
import { SecretTooltip } from "../SecretTooltip";
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

export function getSecretDetailColumn(
	secretId: string,
	name: string
): ColumnDef<{ key: string; value: string }>[] {
	return [
		{
			id: "key",
			header: "Key",
			accessorKey: "key",
			cell: ({ row }) => {
				const code = `from zenml.client import Client
secret = Client().get_secret(${name})
	  
# 'secret.secret_values' will contain a dictionary with all key-value pairs within your secret.
secret.secret_values["${row.original.key}"]
	  `;
				return (
					<div className="flex items-center space-x-2">
						<KeyIcon className="h-4 w-4 flex-shrink-0" />
						<div className="flex flex-col">
							<div className="flex flex-row items-center gap-0.5 space-x-1">
								<div className="flex flex-row items-center">
									<span className="text-text-md font-semibold text-theme-text-primary">
										{row.original.key}
									</span>
									<SecretTooltip code={code} />
								</div>
							</div>
						</div>
					</div>
				);
			}
		},
		{
			id: "value",
			header: "Value",
			accessorKey: "value",
			cell: ({ row }) => <ValueCell value={row.getValue("value")} />
		},
		{
			id: "actions",
			header: "",
			cell: ({ row }) => <SecretTableDropDown secretId={secretId} keyName={row.original.key} />
		}
	];
}
