import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Stack } from "@/types/stack";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library";
import { StackActionsMenu } from "./ActionsDropdown";
import { StackSheet } from "@/components/stacks/Sheet";

export function getStackColumns(): ColumnDef<Stack>[] {
	return [
		{
			id: "name",
			header: "Stack",
			accessorFn: (row) => ({ name: row.name, id: row.id }),
			cell: ({ getValue }) => {
				const { name, id } = getValue<{ name: string; id: string }>();
				return (
					<div className="group/copybutton flex items-center gap-2">
						<Avatar type="square" size="md">
							<AvatarFallback size="md">{name[0]}</AvatarFallback>
						</Avatar>
						<div>
							<div className="flex items-center gap-1">
								<StackSheet stackName={name} stackId={id}>
									<h2 className="text-text-md font-semibold">{name}</h2>
								</StackSheet>
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
			id: "created",
			header: "Created at",
			accessorFn: (row) => row.body?.created,
			cell: ({ getValue }) => (
				<p className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={getValue<string>()} />
				</p>
			)
		},
		{
			id: "author",
			header: "Author",
			accessorFn: (row) => ({ author: row.body?.user }),
			cell: ({ getValue }) => {
				const { author } = getValue<{ author?: User }>();
				if (!author) return null;
				return <InlineAvatar username={author.name} />;
			}
		},
		{
			id: "actions",
			header: "",
			accessorKey: "name",
			cell: ({ getValue }) => {
				return <StackActionsMenu name={getValue<string>()} />;
			}
		}
	];
}
