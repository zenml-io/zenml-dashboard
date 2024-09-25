import LockIcon from "@/assets/icons/Lock.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { getUsername } from "@/lib/user";
import { routes } from "@/router/routes";
import { SecretNamespace } from "@/types/secret";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import SecretsDropdown from "./SecretsDropdown";
import { SecretTooltip } from "./SecretTooltip";

export const secretsColumns: ColumnDef<SecretNamespace>[] = [
	{
		id: "secret",
		header: "Secret",
		accessorFn: (row) => row.name,
		cell: ({ getValue, row }) => {
			const code = `from zenml.client import Client
secret = Client().get_secret(${row.original.name})
`;

			return (
				<div className="flex cursor-pointer items-center space-x-2">
					<LockIcon className="h-5 w-5 flex-shrink-0 fill-primary-400" />
					<div className="group/copybutton flex flex-col">
						<div className="flex flex-row items-center space-x-1">
							<div className="flex items-center space-x-1">
								<Link
									className="text-text-md font-semibold text-theme-text-primary"
									to={routes.settings.secrets.detail(row.original.id)}
								>
									{row.original.name}
								</Link>
								<SecretTooltip code={code} />
							</div>
							<CopyButton copyText={getValue<string>()} />
						</div>
						<div className="flex items-center gap-1">
							<Link
								to={routes.settings.secrets.detail(row.original.id)}
								className="flex items-center gap-1 text-text-sm text-theme-text-secondary"
							>
								{row.original.id.slice(0, 8)}
							</Link>
							<CopyButton copyText={row.original.id} />
						</div>
					</div>
				</div>
			);
		}
	},

	{
		id: "author",
		header: "Author",
		accessorFn: (row) => row.body?.user,
		cell: ({ getValue }) => {
			const user = getValue<User>();
			return (
				<>
					<InlineAvatar username={getUsername(user)} />
				</>
			);
		}
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
