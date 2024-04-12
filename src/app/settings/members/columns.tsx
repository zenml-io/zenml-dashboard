import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zenml-io/react-component-library";
import { DisplayDate } from "@/components/DisplayDate";
import { User, UserBody } from "@/types/user";
import { InlineAvatar } from "../../../components/InlineAvatar";

type NameColumn = {
	name: User["name"];
	is_admin: UserBody["is_admin"];
};

export function columns(): ColumnDef<User>[] {
	return [
		{
			id: "name",
			meta: {
				width: "50%"
			},
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
			meta: {
				width: "10%"
			},
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
			meta: {
				width: "10%"
			},
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		}
		// {
		// 	id: "actions",
		// 	header: "",
		// 	accessorFn: (row) => row.body?.created,
		// 	meta: {
		// 		width: "5%"
		// 	},
		// 	cell: ({ getValue }) => {
		// 		return <MembersDropdown />;
		// 	}
		// }
	];
}
