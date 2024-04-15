import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zenml-io/react-component-library";
import { DisplayDate } from "@/components/DisplayDate";
import { User, UserBody } from "@/types/user";
import { InlineAvatar } from "../../../components/InlineAvatar";
import MembersDropdown from "./MemberDropdown";

type NameColumn = {
	name: User["name"];
	is_admin: UserBody["is_admin"];
};

type Props = {
	isAdmin?: boolean;
};

export function columns({ isAdmin }: Props): ColumnDef<User>[] {
	return [
		{
			id: "name",
			accessorFn: (row): NameColumn => ({
				name: row.name,
				is_admin: !!row.body?.is_admin
			}),
			cell: ({ getValue }) => {
				const { name, is_admin } = getValue<NameColumn>();
				return (
					<div className="flex">
						<InlineAvatar username={name} />
						{is_admin && (
							<div>
								<Badge className="ml-2 capitalize" size="xs" color={"purple"}>
									Admin
								</Badge>
							</div>
						)}
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

						meta: {
							width: "5%"
						},
						cell: () => {
							return <MembersDropdown />;
						}
					}
				]
			: [])
	];
}
