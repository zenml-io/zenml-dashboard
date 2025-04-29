import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { ComponentSheet } from "@/components/stack-components/component-sheet";
import { ComponentBadge } from "@/components/stack-components/ComponentBadge";
import { snakeCaseToTitleCase } from "@/lib/strings";
import { sanitizeUrl } from "@/lib/url";
import { StackComponent } from "@/types/components";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { ComponentDropdown } from "./component-dropdown";

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
								<ComponentSheet componentId={id}>
									<button>
										<h2 className="text-text-md font-semibold">{name}</h2>
									</button>
								</ComponentSheet>
								<CopyButton copyText={name} />
							</div>
							<div className="flex items-center gap-1">
								<ComponentSheet componentId={id}>
									<button className="text-text-xs text-theme-text-secondary">
										{id.split("-")[0]}
									</button>
								</ComponentSheet>
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
			accessorFn: (row) => row.body?.flavor_name,
			cell: ({ row }) => {
				const flavor = row.original.body?.flavor_name;
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
				const author = row.original.body?.user?.name;
				if (!author) return null;
				return <InlineAvatar username={author} />;
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
		},
		{
			id: "admin_actions",
			header: "",
			cell: ({ row }) => {
				return <ComponentDropdown id={row.original.id} />;
			}
		}
	];
}
