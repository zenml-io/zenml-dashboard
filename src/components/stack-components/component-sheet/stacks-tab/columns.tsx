import { Stack } from "@/types/stack";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library";
import { CopyButton } from "../../../CopyButton";
import { DisplayDate } from "../../../DisplayDate";
import { InlineAvatar } from "../../../InlineAvatar";

export function getStackColumnsPanel(): ColumnDef<Stack>[] {
	return [
		{
			id: "name",
			header: "Stack",
			accessorFn: (row) => row.name,
			cell: ({ row }) => {
				const { name, id } = row.original;
				return (
					<div className="group/copybutton flex items-center gap-2">
						<Avatar type="square" size="md">
							<AvatarFallback size="md">{name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center gap-1">
								<h2 className="text-text-md font-semibold">{name}</h2>
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
			id: "author",
			header: "Author",
			accessorFn: (row) => ({ author: row.body?.user }),
			cell: ({ getValue }) => {
				const { author } = getValue<{ author?: User }>();
				if (!author) return null;
				return <InlineAvatar username={author.name || "default"} />;
			}
		},
		{
			id: "created",
			header: "Created at",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		}
	];
}
