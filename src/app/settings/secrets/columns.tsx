import LockIcon from "@/assets/icons/Lock.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { getSecretSnippet } from "@/lib/code-snippets";
import { routes } from "@/router/routes";
import { SecretNamespace } from "@/types/secret";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import SecretsDropdown from "./SecretsDropdown";
import { SecretTooltip } from "./SecretTooltip";

export const secretsColumns: ColumnDef<SecretNamespace>[] = [
	{
		id: "secret",
		header: "Secret",
		accessorFn: (row) => row.name,
		meta: {
			className: "max-w-[30ch]"
		},
		cell: ({ getValue, row }) => {
			const code = getSecretSnippet(row.original.name);

			return (
				<div className="flex items-center space-x-2">
					<LockIcon className="h-5 w-5 flex-shrink-0 fill-primary-400" />
					<div className="group/copybutton flex w-full flex-col">
						<div className="flex flex-1 flex-row items-center space-x-1">
							<div className="flex min-w-0 flex-1 items-center space-x-1">
								<Link
									className="truncate text-text-md font-semibold text-theme-text-primary"
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
		accessorFn: (row) => row.resources?.user?.name,
		cell: ({ row }) => {
			const user = row.original.resources?.user;
			if (!user) return null;
			return (
				<InlineAvatar
					avatarUrl={user.body?.avatar_url ?? undefined}
					username={user.name}
					isServiceAccount={!!user.body?.is_service_account}
				/>
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
			return row.original.resources?.user?.body?.is_admin ? (
				<SecretsDropdown secretId={secretId} />
			) : (
				<p className="text-sm text-theme-text-secondary">No Actions</p>
			);
		}
	}
];
