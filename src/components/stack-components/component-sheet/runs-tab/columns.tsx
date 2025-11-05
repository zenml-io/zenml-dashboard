import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { routes } from "@/router/routes";
import { ExecutionStatus, PipelineRun } from "@/types/pipeline-runs";
import { ColumnDef } from "@tanstack/react-table";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { Link } from "react-router-dom";

export const runsColumns: ColumnDef<PipelineRun>[] = [
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
				<div className="group/copybutton flex min-w-[10rem] items-center gap-2">
					<RunIcon className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(status)}`} />
					<div>
						<div className="flex items-center gap-1">
							<Link
								to={routes.projects.runs.detail(id)}
								className="grid grid-cols-1 items-center gap-1"
							>
								<span className="truncate text-text-md font-semibold text-theme-text-primary">
									{name}
								</span>
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
		id: "created-at",
		header: "Created at",
		accessorFn: (row) => ({
			date: row.body?.created
		}),
		cell: ({ getValue }) => {
			const { date } = getValue<{
				date: string;
			}>();

			return (
				<div className="text-text-sm text-theme-text-secondary">
					<DisplayDate dateString={date} />
				</div>
			);
		}
	}
];
