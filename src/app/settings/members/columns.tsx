import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zenml-io/react-component-library";
import { DisplayDate } from "@/components/DisplayDate";
import MembersDropdown from "./MemberDropdown";
import { User } from "@/types/user";
import { CompleteAvatar } from "@/components/CompleteAvatar";

type NameColumn = {
	name: User["name"];
	avatar_url: User["avatar_url"];
	email: User["email"];
};

export function columns(): ColumnDef<User>[] {
	return [
		{
			id: "name",
			meta: {
				width: "50%"
			},
			accessorFn: (row) => ({
				name: row.name,
				email: row.body?.email_opted_in,
				is_admin: row.body?.is_admin
			}),
			cell: ({ getValue }) => {
				const { email, name, is_admin } = getValue<NameColumn>();
				return (
					<div className="flex">
						<CompleteAvatar
							name={name}
							size="md"
							type="square"
							email={email || "No email"}
							avatarUrl="https://avatar.vercel.sh/default?size=24"
						/>
						{is_admin && (
							<div>
								<Badge className="ml-2 capitalize" size="xs" color={"purple"}>
									ADMIN
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
		},
		{
			id: "actions",
			header: "",
			accessorFn: (row) => row.body?.created,
			meta: {
				width: "5%"
			},
			cell: ({ getValue }) => {
				return <MembersDropdown />;
			}
		}
	];
}
