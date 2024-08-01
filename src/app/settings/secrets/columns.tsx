// columns.ts
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { SecretNamespace } from "@/types/secret";
import { ColumnDef } from "@tanstack/react-table";
import SecretsDropdown from "./SecretsDropdown";
import LockIcon from "@/assets/icons/lock-icon.svg?react";
import { NavigateFunction } from "react-router-dom";
import { CopyButton } from "@/components/CopyButton";

export function getSecretColumns(navigate: NavigateFunction): ColumnDef<SecretNamespace>[] {
	return [
		{
			id: "secret",
			header: "Secret",
			accessorFn: (row) => row.name,
			cell: ({ getValue, row }) => (
				<div className="flex cursor-pointer items-center space-x-2">
					<LockIcon className="h-4 w-4 flex-shrink-0 cursor-pointer" />
					<div className="flex flex-col">
						<div className="group/copybutton flex flex flex-row items-center gap-0.5 space-x-1">
							<span
								className=" text-text-md font-semibold text-theme-text-primary"
								onClick={() => navigate(`/settings/secrets/${row.original.id}`)}
							>
								{getValue<string>()}
							</span>
							<CopyButton copyText={getValue<string>()} />
						</div>
						<span className="text-sm text-gray-500"> {row.original.id.slice(0, 8)}</span>
					</div>
				</div>
			)
		},

		{
			id: "author",
			header: "Author",
			accessorFn: (row) => row.body?.user?.body?.full_name,
			cell: ({ getValue }) => (
				<>
					<InlineAvatar username={getValue<string>()} />
				</>
			)
		},
		{
			id: "created_at",
			header: "Created At",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		},
		{
			id: "admin_actions",
			header: "",
			accessorFn: (row) => String(row.id),
			cell: ({ row, getValue }) => {
				const secretId = getValue() as string;
				return row.original.body?.user?.body?.is_admin ? (
					<SecretsDropdown secretId={secretId} />
				) : (
					<p className="text-sm text-theme-text-secondary">No Actions</p>
				);
			}
		}
	];
}
