import KeyIcon from "@/assets/icons/key-icon.svg?react";
import { SensitiveValue } from "@/components/sensitive-value";
import { ActionCell } from "@/components/tables/action-cell";
import { ColumnDef } from "@tanstack/react-table";
import { SecretTooltip } from "../SecretTooltip";
import SecretTableDropDown from "./SecretTableDropDown";

export function getSecretDetailColumn(
	secretId: string,
	name: string
): ColumnDef<{ key: string; value: string }>[] {
	return [
		{
			id: "key",
			header: "Key",
			accessorKey: "key",
			meta: {
				width: "40%",
				className: "overflow-hidden"
			},
			cell: ({ row }) => {
				const code = `from zenml.client import Client
secret = Client().get_secret("${name}")

# 'secret.secret_values' will contain a dictionary with all key-value pairs within your secret.
secret.secret_values["${row.original.key}"]
	  `;
				return (
					<div className="flex min-w-0 items-center space-x-2">
						<KeyIcon className="h-5 w-5 shrink-0 fill-primary-400" />
						<div className="flex min-w-0 items-center space-x-1">
							<span className="truncate text-text-md font-semibold text-theme-text-primary">
								{row.original.key}
							</span>
							<SecretTooltip code={code} />
						</div>
					</div>
				);
			}
		},
		{
			id: "value",
			header: "Value",
			accessorKey: "value",
			meta: {
				width: "50%",
				className: "overflow-hidden"
			},
			cell: ({ row }) => {
				const value = row.getValue("value");
				return <SensitiveValue value={typeof value === "string" ? value : ""} />;
			}
		},
		{
			id: "actions",
			header: "",
			meta: {
				width: "10%",
				className: "w-12"
			},
			cell: ({ row }) => (
				<ActionCell>
					<SecretTableDropDown secretId={secretId} keyName={row.original.key} />
				</ActionCell>
			)
		}
	];
}
