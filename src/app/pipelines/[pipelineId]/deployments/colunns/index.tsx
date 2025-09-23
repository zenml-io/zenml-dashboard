import Rocket from "@/assets/icons/rocket.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { routes } from "@/router/routes";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library/components/server";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export function useDeploymentColumns(): ColumnDef<Deployment>[] {
	return useMemo<ColumnDef<Deployment>[]>(
		() => [
			// {
			// 	id: "check",

			// 	header: ({ table }) => {
			// 		return (
			// 			<Checkbox
			// 				id="check-all"
			// 				checked={table.getIsAllRowsSelected()}
			// 				onCheckedChange={(state) =>
			// 					table.toggleAllRowsSelected(state === "indeterminate" ? true : state)
			// 				}
			// 			/>
			// 		);
			// 	},

			// 	meta: {
			// 		width: "1%"
			// 	},

			// 	cell: ({ row }) => {
			// 		return (
			// 			<Checkbox
			// 				id={row.id}
			// 				checked={row.getIsSelected()}
			// 				onCheckedChange={row.getToggleSelectedHandler()}
			// 				className="h-3 w-3"
			// 			/>
			// 		);
			// 	}
			// },

			{
				id: "name",
				header: "Deployment",
				accessorFn: (row) => row.name,

				cell: ({ row }) => {
					const name = row.original.name;
					const id = row.original.id;
					return (
						<div className="group/copybutton flex items-center gap-2">
							<Rocket className={`h-5 w-5 fill-primary-400`} />
							<div>
								<div className="flex items-center gap-1">
									<Link
										to={routes.projects.deployments.detail.overview(id)}
										className="flex items-center gap-1"
									>
										<span className="text-text-md font-semibold text-theme-text-primary">
											{name ?? "Unnamed"}
										</span>
									</Link>

									<CopyButton copyText={name ?? ""} />
								</div>
							</div>
						</div>
					);
				}
			},
			{
				id: "status",
				header: "Status",
				accessorFn: (row) => row.body?.status,
				cell: ({ row }) => {
					const status = row.original.body?.status;
					if (!status) return <div>No status</div>;

					return (
						<Tag
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-0.5"
							color="green"
						>
							{status}
						</Tag>
					);
				}
			},
			{
				id: "author",
				header: "Author",
				accessorFn: (row) => row.resources?.user?.name,
				cell: ({ row }) => {
					const author = row.original.resources?.user;
					if (!author) return null;
					return (
						<InlineAvatar
							username={author.name}
							isServiceAccount={!!author.body?.is_service_account}
							avatarUrl={author.body?.avatar_url ?? undefined}
						/>
					);
				}
			},
			{
				id: "created",
				header: "Created at",
				accessorFn: (row) => ({
					date: row.body?.created
				}),
				cell: ({ getValue }) => {
					const { date } = getValue<{
						date: string;
					}>();
					return <DisplayDate dateString={date} />;
				}
			}
			// {
			// 	id: "admin_actions",
			// 	header: "",
			// 	accessorFn: (row) => row.id,
			// 	cell: ({ row }) => {
			// 		const snapshotId = row.original.id;

			// 		return <PipelineSnapshotTableActions snapshotId={snapshotId} />;
			// 	}
			// }
		],

		[]
	);
}
