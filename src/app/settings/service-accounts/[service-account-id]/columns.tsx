import KeyIcon from "@/assets/icons/key-icon.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { is1yearOld, is6monthsOld, prepareBackendTimestamp } from "@/lib/dates";
import { ApiKey } from "@/types/service-accounts";
import { ColumnDef } from "@tanstack/react-table";
import ApiKeyDropdown from "./Dropdown";
import ToggleActiveApiKey from "./ToggleApiKey";
import { Checkbox } from "@zenml-io/react-component-library/components/client";

export function getServiceAccountDetailColumn(): ColumnDef<ApiKey>[] {
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
			id: "name",
			header: "Name",
			accessorFn: (row) => ({
				name: row.name
			}),
			cell: ({ row }) => {
				return (
					<div className="flex min-w-[10rem] items-center space-x-2">
						<KeyIcon className="h-5 w-5 shrink-0 fill-primary-400" />
						<div className="group/copybutton flex flex-col">
							<div className="grid grid-cols-1 items-center space-x-1">
								<div className="truncate text-text-md font-semibold text-theme-text-primary">
									{row.original.name}
								</div>
							</div>
							<div className="flex items-center gap-1 text-text-sm text-theme-text-secondary">
								{row.original.metadata?.description}
							</div>
						</div>
					</div>
				);
			}
		},

		{
			id: "last-login",
			header: "Last Login",
			accessorFn: (row) => row.metadata?.last_login,
			cell: ({ row }) => {
				if (!row.original.metadata?.last_login) {
					return <p>Never</p>;
				}
				return (
					<p>
						<DisplayDate short dateString={row.original.metadata?.last_login} />
					</p>
				);
			}
		},
		{
			id: "last-rotated",
			header: "Last Rotated",
			accessorFn: (row) => row.metadata?.last_rotated,
			cell: ({ row }) => {
				const date = row.original.metadata?.last_rotated;
				if (!date) {
					return <p>Never</p>;
				}
				const parsedDate = prepareBackendTimestamp(date);
				const is6Months = is6monthsOld(parsedDate);
				const is1Year = is1yearOld(parsedDate);
				return (
					<div>
						<p>
							<DisplayDate short dateString={date} />
						</p>
						{(is6Months || is1Year) && (
							<p
								className={`${
									is1Year ? "text-theme-text-error" : "text-theme-text-warning"
								} text-text-xs`}
							>
								{is1Year ? "More than 1 year old" : "More than 6 months old"}
							</p>
						)}
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
					<ToggleActiveApiKey
						isActive={!!row.original.body?.active}
						serviceAccountId={row.original.body?.service_account.id || ""}
						apiKeyId={row.original.id}
					/>
				);
			}
		},
		{
			id: "actions",
			header: "",
			meta: {
				width: "5%"
			},

			cell: ({ row }) => {
				const serviceAccountId = row.original.body?.service_account.id;
				if (!serviceAccountId) return null;
				return (
					<div className="flex items-center justify-end">
						<ApiKeyDropdown serviceAccountId={serviceAccountId} apiKeyId={row.original.id} />
					</div>
				);
			}
		}
	];
}
