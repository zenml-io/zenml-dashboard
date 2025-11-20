import { AdminBadge } from "@/components/admin-badge";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zenml-io/react-component-library";
import MembersDropdown from "./MemberDropdown";

type Props = {
	isAdmin?: boolean;
};

export function columns({ isAdmin }: Props): ColumnDef<User>[] {
	return [
		{
			id: "name",
			accessorFn: (row) => row.name,
			cell: ({ row }) => {
				const user = row.original;
				return (
					<div className="flex items-center gap-1">
						<InlineAvatar
							avatarUrl={user.body?.avatar_url ?? undefined}
							username={user.name}
							isServiceAccount={!!user.body?.is_service_account}
						/>
						{user.body?.is_admin && <AdminBadge />}
					</div>
				);
			},
			header: "User"
		},
		{
			accessorKey: "status",
			header: "Status",
			accessorFn: (row) => ({ status: row.body?.active }),
			cell: ({ getValue }) => {
				const { status } = getValue<{ status: string }>();
				return (
					<Badge className="capitalize" color={status ? "green" : "grey"}>
						{status ? "Active" : "Inactive"}
					</Badge>
				);
			}
		},
		{
			id: "created",
			header: "Created",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		},

		...(isAdmin
			? [
					{
						id: "actions",
						header: "",
						accessorFn: (row) => ({
							id: row.id,
							name: row.name
						}),
						meta: {
							width: "5%"
						},
						cell: ({ getValue }) => {
							const { id, name } = getValue() as { id: string; name: string };
							return (
								<div className="flex items-center justify-end">
									<MembersDropdown name={name} userId={id} />
								</div>
							);
						}
					} as ColumnDef<User>
				]
			: [])
	];
}
