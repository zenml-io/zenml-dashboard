import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { StackSheet } from "@/components/stacks/Sheet";
import { Stack } from "@/types/stack";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@zenml-io/react-component-library";
import { useMemo } from "react";
import { StackActionsMenu } from "./ActionsDropdown";

export function useStackColumns(): ColumnDef<Stack>[] {
	const cols: ColumnDef<Stack>[] = [
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
								<CopyButton copyText={name}></CopyButton>
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
			accessorFn: (row) => ({ author: row.resources?.user?.name }),
			cell: ({ getValue }) => {
				const { author } = getValue<{ author?: string }>();
				if (!author) return null;
				return <InlineAvatar username={author} />;
			}
		},
		{
			id: "actions",
			header: "",
			accessorFn: (row) => ({ name: row.name, id: row.id }),
			cell: ({ getValue }) => {
				const { id, name } = getValue<{ name: string; id: string }>();
				return <StackActionsMenu name={name} id={id} />;
			}
		}
	];

	return useMemo(() => cols, []);
}
