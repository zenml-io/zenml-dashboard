import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import {
	ExecutionStatusIcon,
	getExecutionStatusColor,
	getExecutionStatusTagColor
} from "@/components/ExecutionStatus";
import { routes } from "@/router/routes";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Pipeline } from "@/types/pipelines";
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
import { PipelineDropdown } from "./PipelineDropdown";

export function getPipelineColumns(): ColumnDef<Pipeline>[] {
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
			id: "name",
			header: "Pipeline",
			cell: ({ row }) => {
				return (
					<div className="group/copybutton flex min-w-[10rem] items-center gap-2">
						<PipelineIcon
							className={`h-5 w-5 shrink-0 ${getExecutionStatusColor(row.original.resources?.latest_run_status)}`}
						/>
						<div>
							<div className="flex items-center gap-1">
								<Link
									to={routes.projects.pipelines.detail.runs(row.original.id)}
									className="grid grid-cols-1 items-center gap-1"
								>
									<span className="truncate text-text-md font-semibold text-theme-text-primary">
										{row.original.name}
									</span>
								</Link>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="hover:text-theme-text-brand hover:underline">
											<ExecutionStatusIcon status={row.original.resources?.latest_run_status} />
										</TooltipTrigger>
										<TooltipContent className="z-20 capitalize">
											{row.original.resources?.latest_run_status}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<CopyButton copyText={row.original.name} />
							</div>
							<Link
								to={routes.projects.pipelines.detail.runs(row.original.id)}
								className="flex items-center gap-1"
							>
								<p className="text-text-xs text-theme-text-secondary">
									{row.original.id.split("-")[0]}
								</p>
								<CopyButton copyText={row.original.id} />
							</Link>
						</div>
					</div>
				);
			}
		},
		{
			id: "latest-run",
			header: "Latest Run",
			accessorFn: (row) => ({
				status: row.resources?.latest_run_status,
				runId: row.resources?.latest_run_id
			}),
			cell: ({ getValue }) => {
				const { runId, status } = getValue<{
					runId?: string;
					status?: ExecutionStatus;
				}>();

				if (!runId || !status) return <div>No run</div>;

				return (
					<Link to={routes.projects.runs.detail(runId)}>
						<Tag
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-0.5"
							color={getExecutionStatusTagColor(status)}
						>
							<RunIcon className={`h-3 w-3 fill-current`} />
							{runId?.split("-")[0]}
						</Tag>
					</Link>
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
				return <PipelineDropdown id={row.original.id} />;
			}
		}
	];
}
