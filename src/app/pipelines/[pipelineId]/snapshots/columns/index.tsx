import PipelineIcon from "@/assets/icons/dataflow.svg?react";
import SnapshotIcon from "@/assets/icons/pipeline-template.svg?react";
import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { getExecutionStatusTagColor, getRunIconColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { routes } from "@/router/routes";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox, Tag } from "@zenml-io/react-component-library";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PipelineSnapshotTableActions } from "./table-actions";

export function useSnapshotColumns(): ColumnDef<PipelineSnapshot>[] {
	return useMemo<ColumnDef<PipelineSnapshot>[]>(
		() => [
			{
				id: "check",

				header: ({ table }) => {
					return (
						<Checkbox
							id="check-all"
							checked={table.getIsAllRowsSelected()}
							onCheckedChange={(state) =>
								table.toggleAllRowsSelected(state === "indeterminate" ? true : state)
							}
						/>
					);
				},

				meta: {
					width: "1%"
				},

				cell: ({ row }) => {
					return (
						<Checkbox
							id={row.id}
							checked={row.getIsSelected()}
							onCheckedChange={row.getToggleSelectedHandler()}
							className="h-3 w-3"
						/>
					);
				}
			},

			{
				id: "name",

				header: "Snapshot",

				enableSorting: true,

				accessorFn: (row) => row.name,

				cell: ({ row }) => {
					const name = row.original.name;
					const id = row.original.id;
					return (
						<div className="group/copybutton flex items-center gap-2">
							<SnapshotIcon className={`h-5 w-5 fill-primary-400`} />
							<div>
								<div className="flex items-center gap-1">
									<Link to="#" className="flex items-center gap-1">
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
				id: "pipeline",
				header: "Pipeline",
				accessorFn: (row) => row.metadata?.pipeline?.name,
				cell: ({ row }) => {
					const name = row.original.metadata?.pipeline?.name;
					const id = row.original.metadata?.pipeline?.id;
					if (!name || !id) {
						return null;
					}
					return (
						<Link to={routes.projects.pipelines.detail.runs(id)}>
							<Tag
								color="purple"
								className="inline-flex items-center gap-0.5"
								rounded={false}
								emphasis="subtle"
							>
								<PipelineIcon className="mr-1 h-4 w-4 fill-theme-text-brand" />

								{name}
							</Tag>
						</Link>
					);
				}
			},
			{
				id: "latest-run",
				header: "Latest Run",
				accessorFn: (row) => row.resources?.latest_triggered_run_id,
				cell: ({ row }) => {
					const runId = row.original.resources?.latest_run_id;
					const status = row.original.resources?.latest_run_status;
					if (!runId || !status) return <div>No run</div>;

					return (
						<Link to={routes.projects.runs.detail(runId)}>
							<Tag
								emphasis="subtle"
								rounded={false}
								className="inline-flex items-center gap-0.5"
								color={getExecutionStatusTagColor(status)}
							>
								<RunIcon className={`h-3 w-3 ${getRunIconColor(status)}`} />

								{runId?.split("-")[0]}
							</Tag>
						</Link>
					);
				}
			},
			{
				id: "user",
				header: "Author",
				enableSorting: true,
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
				enableSorting: true,
				accessorFn: (row) => ({
					date: row.body?.created
				}),
				cell: ({ getValue }) => {
					const { date } = getValue<{
						date: string;
					}>();
					return <DisplayDate dateString={date} />;
				}
			},
			{
				id: "admin_actions",
				header: "",
				accessorFn: (row) => row.id,
				cell: ({ row }) => {
					const snapshotId = row.original.id;

					return <PipelineSnapshotTableActions snapshotId={snapshotId} />;
				}
			}
		],

		[]
	);
}
