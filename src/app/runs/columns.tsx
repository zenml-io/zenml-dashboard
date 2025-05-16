import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { routes } from "@/router/routes";
import { ExecutionStatus, PipelineRun } from "@/types/pipeline-runs";
import { Stack } from "@/types/stack";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library";
import {
	Checkbox,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Link } from "react-router-dom";
import { RunDropdown } from "./RunDropdown";

export const runsColumns: ColumnDef<PipelineRun>[] = [
	{
		id: "select",
		meta: {
			width: "5%"
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
		id: "name",
		header: "Run",
		accessorFn: (row) => ({
			id: row.id,
			name: row.name,
			status: row.body?.status
		}),
		cell: ({ getValue }) => {
			const { name, status, id } = getValue<{
				id: string;
				name: string;
				status: ExecutionStatus;
			}>();
			return (
				<div className="group/copybutton flex items-center gap-2">
					<RunIcon className={`h-5 w-5 ${getExecutionStatusColor(status)}`} />
					<div>
						<div className="flex items-center gap-1">
							<Link to={routes.projects.runs.detail(id)} className="flex items-center gap-1">
								<span className="text-text-md font-semibold text-theme-text-primary">{name}</span>
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
		id: "pipeline",
		header: "Pipeline",
		accessorFn: (row) => row.body?.pipeline?.name,
		cell: ({ getValue }) => {
			const value = getValue<string>();
			if (!value) {
				return null;
			}
			return (
				<Link to={routes.projects.pipelines.namespace(value)}>
					<Tag
						color="purple"
						className="inline-flex items-center gap-0.5 truncate"
						rounded={false}
						emphasis="subtle"
					>
						{value}
					</Tag>
				</Link>
			);
		}
	},

	{
		id: "stack",
		header: "Stack",
		accessorFn: (row) => ({
			name: row.body?.stack?.name,
			id: row.body?.stack?.id
		}),
		cell: ({ getValue }) => {
			const { name, id } = getValue<{
				name: Stack["name"];
				id: Stack["id"];
			}>();

			if (!name || !id) return null;

			return (
				<Tag rounded={false} className="inline-block" color="turquoise" emphasis="subtle">
					{name}
				</Tag>
			);
		}
	},
	{
		id: "created-at",
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
	},
	{
		id: "author",
		header: "Author",
		accessorFn: (row) => ({
			name: row.body?.user?.name
		}),
		cell: ({ getValue }) => {
			const { name } = getValue<{
				name?: string;
			}>();

			if (!name) return null;

			return <InlineAvatar username={name} />;
		}
	},
	{
		id: "admin_actions",
		header: "",
		meta: {
			width: "5%"
		},
		cell: ({ row }) => {
			return <RunDropdown id={row.original.id} />;
		}
	}
];
