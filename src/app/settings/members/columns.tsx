import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@zenml-io/react-component-library";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatus } from "@/types/pipeline-runs";
import MembersDropdown from "./MemberDropdown";

type NameColumn = {
	name: TenantMember["name"];
	avatar_url: TenantMember["avatar_url"];
	email: TenantMember["email"];
};

export function columns({ tenantId }: { tenantId: string }): ColumnDef<any>[] {
	const getBadgeColor = (status?: ExecutionStatus) => {
		if (!status) return "gray";
		switch (status) {
			case "completed":
				return "success";
			case "cached":
				return "gray";
			default:
				return "gray";
		}
	};

	return [
		{
			id: "name",
			meta: {
				width: "50%"
			},
			accessorFn: (row) => ({ avatar_url: row.avatar_url, name: row.name, email: row.email }),
			cell: ({ getValue }) => {
				const { avatar_url, email, name } = getValue<NameColumn>();
				return (
					<div className="inline-flex items-center gap-1">
						{/* <CompleteAvatar
							avatarUrl={avatar_url || ""}
							fallbackValue={name ? name[0] : email[0]}
							size="sm"
						/> */}
						<div>
							<p className="text-text-sm">{getValue<NameColumn>().name}</p>
							<p className="text-text-xs text-theme-text-secondary">
								{getValue<NameColumn>().email}
							</p>
						</div>
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
			accessorFn: (row) => ({ status: "completed" }),
			cell: ({ getValue }) => {
				const { status } = getValue<{ status: string }>();
				return (
					<Badge className="capitalize" variant={getBadgeColor(status)}>
						{status || "None"}
					</Badge>
				);
			}
		},
		{
			id: "deployed",
			header: "Deployed",
			accessorFn: (row) => row.created,
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
			id: "deployed",
			header: "",
			accessorFn: (row) => row.created,
			meta: {
				width: "10%"
			},
			cell: ({ getValue }) => {
				const { orgId, tenantId, roleId, name, systemManaged } = getValue<NameColumn>();
				return (
					<MembersDropdown
						orgId={orgId}
						tenantId={tenantId || ""}
						roleId={roleId}
						systemManaged={systemManaged}
						roleName={"idToTitle(name)"}
					/>
				);
			}
		}
	];
}
