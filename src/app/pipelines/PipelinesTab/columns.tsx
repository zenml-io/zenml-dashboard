import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import RunIcon from "@/assets/icons/terminal.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { routes } from "@/router/routes";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Pipeline } from "@/types/pipelines";
import { ColumnDef } from "@tanstack/react-table";
import {
	Tag,
	TagProps,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { PipelineDropdown } from "./PipelineDropdown";
import { PipelinesSelector } from "./PipelinesSelector";

export function getPipelineColumns(): ColumnDef<Pipeline>[] {
	return [
		{
			id: "check",
			header: "",
			meta: {
				width: "1%"
			},
			cell: ({ row }) => {
				return <PipelinesSelector id={row.original.id} />;
			}
		},
		{
			id: "name",
			header: "Pipeline",
			cell: ({ row }) => {
				return (
					<div className="group/copybutton flex items-center gap-2">
						<PipelineIcon
							className={`h-5 w-5 ${getExecutionStatusColor(row.original.body?.latest_run_status)}`}
						/>
						<div>
							<div className="flex items-center gap-1">
								<Link
									to={routes.pipelines.namespace(encodeURIComponent(row.original.name))}
									className="flex items-center gap-1"
								>
									<span className="text-text-md font-semibold text-theme-text-primary">
										{row.original.name}
									</span>
								</Link>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="hover:text-theme-text-brand hover:underline">
											<ExecutionStatusIcon status={row.original.body?.latest_run_status} />
										</TooltipTrigger>
										<TooltipContent className="z-20 capitalize">
											{row.original.body?.latest_run_status}
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>

								<CopyButton copyText={row.original.name} />
							</div>
							<Link
								to={routes.pipelines.namespace(encodeURIComponent(row.original.name))}
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
				status: row.body?.latest_run_status,
				runId: row.body?.latest_run_id
			}),
			cell: ({ getValue }) => {
				const { runId, status } = getValue<{
					runId?: string;
					status?: ExecutionStatus;
				}>();

				if (!runId || !status) return <div>No run</div>;

				return (
					<Link to={routes.runs.detail(runId)}>
						<Tag
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-0.5"
							color={getTagColor(status)}
						>
							<RunIcon className={`h-3 w-3 ${getRunIconColor(status)}`} />
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

function getRunIconColor(status?: ExecutionStatus) {
	if (!status) return "fill-theme-text-brand";
	switch (status) {
		case "running":
			return "fill-orange-700";
		case "cached":
			return "fill-theme-text-secondary";
		case "completed":
			return "fill-success-800";
		case "failed":
			return "fill-error-800";
		case "initializing":
			return "fill-theme-text-brand";
	}
}

function getTagColor(status?: ExecutionStatus): TagProps["color"] {
	if (!status) return "purple";
	switch (status) {
		case "running":
			return "orange";
		case "cached":
			return "grey";
		case "completed":
			return "green";
		case "failed":
			return "red";
		case "initializing":
			return "purple";
	}
}
