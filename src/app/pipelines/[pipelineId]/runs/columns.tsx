import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { ScheduleTag } from "@/components/triggers/schedule-tag";
import { routes } from "@/router/routes";
import { PipelineRun, PipelineRunBody } from "@/types/pipeline-runs";
import { Stack } from "@/types/stack";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
	Checkbox,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { RunDropdown } from "../../../runs/RunDropdown";

export function getPipelineDetailColumns(): ColumnDef<PipelineRun>[] {
	return [
		{
			id: "select",
			meta: {
				width: "1%"
			},
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
			cell: ({ row }) => {
				return (
					<Checkbox
						id={`check-${row.id}`}
						checked={row.getIsSelected()}
						onCheckedChange={row.getToggleSelectedHandler()}
					/>
				);
			}
		},
		{
			id: "run",
			header: "Run",
			accessorFn: (row) => ({
				name: row.name,
				id: row.id,
				status: row.body?.status
			}),
			cell: ({ getValue }) => {
				const { name, status, id } = getValue<{
					name: PipelineRun["name"];
					id: PipelineRun["id"];
					status: PipelineRunBody["status"];
				}>();

				return (
					<div className="group/copybutton flex min-w-[10rem] items-center gap-2">
						<RunIcon className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(status)}`} />
						<div>
							<div className="flex items-center gap-1">
								<Link
									to={routes.projects.runs.detail(id)}
									className="grid grid-cols-1 items-center gap-1"
								>
									<h2 className="truncate text-text-md font-semibold">{name}</h2>
								</Link>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="hover:text-theme-text-brand hover:underline">
											<ExecutionStatusIcon status={status} />
										</TooltipTrigger>
										<TooltipContent className="z-20 capitalize">{status}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<CopyButton copyText={name} />
							</div>
							<Link to={routes.projects.runs.detail(id)} className="flex items-center gap-1">
								<p className="text-text-xs text-theme-text-secondary">{id.split("-")[0]}</p>
								<CopyButton copyText={id} />
							</Link>
						</div>
					</div>
				);
			}
		},
		{
			id: "Snapshot",
			header: "Snapshot",
			accessorFn: (row) => row.resources?.source_snapshot?.id,
			cell: ({ row }) => {
				const snapshot = row.original.resources?.source_snapshot;
				const name = snapshot?.name;
				if (!snapshot || !name) return null;

				return <SnapshotLink snapshotId={snapshot.id} snapshotName={name} />;
			}
		},
		{
			id: "stack",
			header: "Stack",
			accessorFn: (row) => ({
				name: row.resources?.stack?.name,
				id: row.resources?.stack?.id
			}),
			cell: ({ getValue }) => {
				const { name, id } = getValue<{
					hasPermissionsDenied: Stack["permission_denied"];
					name: Stack["name"];
					id: Stack["id"];
				}>();

				if (!name || !id) return null;

				return (
					<Link to={routes.stacks.overview}>
						<Tag
							rounded={false}
							className="inline-block whitespace-nowrap"
							color="turquoise"
							emphasis="subtle"
						>
							{name}
						</Tag>
					</Link>
				);
			}
		},
		{
			id: "trigger",
			header: "Trigger",
			accessorFn: (row) => row.resources?.schedule?.name,
			cell: ({ row }) => {
				const schedule = row.original.resources?.schedule;
				if (!schedule) return null;
				return <ScheduleTag />;
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
			accessorFn: (row) => ({ author: row.resources?.user }),
			cell: ({ getValue }) => {
				const { author } = getValue<{ author: User }>();
				return (
					<InlineAvatar
						avatarUrl={author.body?.avatar_url ?? undefined}
						username={author.name}
						isServiceAccount={!!author.body?.is_service_account}
					/>
				);
			}
		},
		{
			id: "admin_actions",
			header: "",
			meta: {
				width: "5%"
			},
			cell: ({ row }) => {
				return (
					<div className="flex items-center justify-end">
						<RunDropdown id={row.original.id} />
					</div>
				);
			}
		}
	];
}
