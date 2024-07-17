import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { SecretNamespace } from "@/types/secret";
import { ColumnDef } from "@tanstack/react-table";
import SecretsDropdown from "./SecretsDropdown";
import LockIcon from "@/assets/icons/lock-icon.svg?react";
import InfoIcon from "@/assets/icons/info-icon.svg?react";

export function getSecretColumns(): ColumnDef<SecretNamespace>[] {
	return [
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
			id: "secret",
			header: "Secret",
			accessorFn: (row) => row.name,
			cell: ({ getValue }) => (
				<div className="flex items-center space-x-2">
					<LockIcon />
					<div className="flex flex-col">
						<div className="flex flex-row space-x-1">
							<span className="text-text-sm font-semibold text-theme-text-primary">
								{getValue<string>()}
							</span>
							<InfoIcon />
						</div>
						<span className="text-sm text-gray-500">85ff662e</span>
					</div>
				</div>
			)
		},
		{
			id: "keys",
			header: "Keys"
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
			header: "Actions",
			cell: ({ row }) =>
				row.original.body?.user?.body?.is_admin ? (
					<SecretsDropdown></SecretsDropdown>
				) : (
					<p className="text-text-sm text-theme-text-secondary">No Actions</p>
				)
		}
	];
}
