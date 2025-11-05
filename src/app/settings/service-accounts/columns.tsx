import { ServiceAccountAvatar } from "@/components/avatars/service-account-avatar";
import { routes } from "@/router/routes";
import { ServiceAccount } from "@/types/service-accounts";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import ServiceAccountsDropdown from "./Dropdown";
import ToggleActiveServiceAccount from "./ToggleServiceAccount";

export function getServiceAccountColumns(): ColumnDef<ServiceAccount>[] {
	return [
		{
			id: "select",
			meta: {
				width: "1%"
			},
			header: ({ table }) => {
				return (
					<Checkbox
						id="check-all"
						checked={table.getIsAllRowsSelected()}
						onCheckedChange={(state) =>
							table.toggleAllRowsSelected(state === "indeterminate" ? true : state)
						}
					/>
				);
			},
			cell: ({ row }) => {
				return (
					<Checkbox
						id={`check-${row.id}`}
						checked={row.getIsSelected()}
						onCheckedChange={row.getToggleSelectedHandler()}
					/>
				);
			}
		},
		{
			id: "service-account",
			header: "Service Account",
			accessorFn: (row) => row.name,
			cell: ({ row }) => {
				return (
					<div className="flex min-w-[10rem] items-center space-x-2">
						<ServiceAccountAvatar
							className="shrink-0 rounded-sm"
							size="sm"
							serviceAccountName={row.original.name}
							serviceAccountAvatar={row.original.body?.avatar_url ?? undefined}
						/>
						<div className="group/copybutton flex flex-col">
							<div className="flex flex-row items-center space-x-1">
								<div className="grid grid-cols-1 items-center space-x-1">
									<Link
										className="truncate text-text-md font-semibold text-theme-text-primary"
										to={routes.settings.service_accounts.detail(row.original.id)}
									>
										{row.original.name}
									</Link>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<Link
									className="flex items-center gap-1 text-text-sm text-theme-text-secondary"
									to={routes.settings.service_accounts.detail(row.original.id)}
								>
									{row.original.metadata?.description}
								</Link>
							</div>
						</div>
					</div>
				);
			}
		},

		{
			id: "active",
			header: "Active",
			accessorFn: (row) => row.body?.active,
			cell: ({ row }) => {
				return (
					<ToggleActiveServiceAccount
						isActive={!!row.original.body?.active}
						serviceAccountId={row.original.id}
					/>
				);
			}
		},
		{
			id: "actions",
			meta: {
				width: "5%"
			},
			header: "",
			cell: ({ row }) => {
				return (
					<div className="flex items-center justify-end">
						<ServiceAccountsDropdown serviceAccountId={row.original.id} />
					</div>
				);
			}
		}
	];
}
