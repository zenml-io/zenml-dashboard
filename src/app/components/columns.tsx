import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { ComponentBadge } from "@/components/stack-components/ComponentBadge";
import { ComponentFallbackDialog } from "@/components/stack-components/ComponentFallbackDialog";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { getUsername } from "@/lib/user";
import { StackComponent } from "@/types/components";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library/components/server";

export function getComponentList(): ColumnDef<StackComponent>[] {
	return [
		{
			id: "name",
			header: "Component",
			accessorKey: "name",
			cell: ({ row }) => {
				const id = row.original.id;
				const name = row.original.name;
				return (
					<div className="group/copybutton flex items-center gap-2">
						<img
							width={32}
							height={32}
							src={sanitizeUrl(row.original.body?.logo_url || "")}
							alt="Flavor Icon"
						/>
						<div>
							<div className="flex items-center gap-1">
								<ComponentFallbackDialog
									name={name}
									type={row.original.body?.type || "orchestrator"}
								>
									<button>
										<h2 className="text-text-md font-semibold">{name}</h2>
									</button>
								</ComponentFallbackDialog>
								<CopyButton copyText={name} />
							</div>
							<div className="flex items-center gap-1">
								<p className="text-text-xs text-theme-text-secondary">{id.split("-")[0]}</p>
								<CopyButton copyText={id} />
							</div>
						</div>
					</div>
				);
			}
		},
		{
			id: "type",
			header: "Component Type",
			accessorFn: (row) => row.body?.type,
			cell: ({ row }) => {
				const type = row.original.body?.type || "orchestrator";
				return <ComponentBadge type={type}>{snakeCaseToTitleCase(type)}</ComponentBadge>;
			}
		},
		{
			id: "flavor",
			header: "Flavor",
			accessorFn: (row) => row.body?.flavor,
			cell: ({ row }) => {
				const flavor = row.original.body?.flavor;
				return (
					<Tag
						rounded={false}
						className="w-fit gap-1 text-theme-text-primary"
						color="grey"
						emphasis="minimal"
					>
						<img
							width={20}
							height={20}
							src={sanitizeUrl(row.original.body?.logo_url || "")}
							alt="Flavor Icon of Component"
						/>
						<p>{flavor}</p>
					</Tag>
				);
			}
		},
		{
			id: "author",
			header: "Author",
			accessorFn: (row) => row.body?.user?.name,
			cell: ({ row }) => {
				const author = row.original.body?.user;
				if (!author) return null;
				return <InlineAvatar username={getUsername(author)} />;
			}
		},
		{
			id: "created",
			header: "Created at",
			accessorFn: (row) => row.body?.created,
			cell: ({ row }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={row.original.body?.created || ""} />
				</p>
			)
		}
	];
}