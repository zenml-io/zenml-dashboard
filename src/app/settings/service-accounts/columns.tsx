import LockIcon from "@/assets/icons/Lock.svg?react";
import { routes } from "@/router/routes";
import { ServiceAccount } from "@/types/service-accounts";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import ToggleActiveServiceAccount from "./ToggleServiceAccount";
import ServiceAccountsDropdown from "./Dropdown";
import { Checkbox } from "@zenml-io/react-component-library";

export function getServiceAccountColumns(): ColumnDef<ServiceAccount>[] {
	return [
		{
			id: "check",
			header: ({ table }) => (
				<Checkbox
					id="check-all"
					checked={table.getIsAllRowsSelected()}
					onCheckedChange={(state) =>
						table.toggleAllRowsSelected(state === "indeterminate" ? true : state)
					}
				/>
			),
			meta: {
				width: "1%"
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
					<div className="flex items-center space-x-2">
						<LockIcon className="h-5 w-5 flex-shrink-0 fill-primary-400" />
						<div className="group/copybutton flex flex-col">
							<div className="flex flex-row items-center space-x-1">
								<div className="flex items-center space-x-1">
									<Link
										className="text-text-md font-semibold text-theme-text-primary"
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
