import RunIcon from "@/assets/icons/pipeline-run.svg?react";
import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import { ExecutionStatusIcon, getExecutionStatusColor } from "@/components/ExecutionStatus";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { PipelineNamespace, PipelineNamespaceBody } from "@/types/pipelines";
import { ColumnDef } from "@tanstack/react-table";
import { Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";
import { CopyButton } from "@/components/CopyButton";

export function getPipelineColumns(): ColumnDef<PipelineNamespace>[] {
	return [
		{
			id: "name",
			header: "Pipeline",
			accessorFn: (row) => ({ name: row.name, status: row.body?.latest_run_status }),
			cell: ({ getValue }) => {
				const { name, status } = getValue<{
					name: PipelineNamespace["name"];
					status: PipelineNamespaceBody["latest_run_status"];
				}>();

				return (
					<div className="group/copybutton flex items-center gap-2">
						<PipelineIcon className={`h-5 w-5 ${getExecutionStatusColor(status)}`} />
						<Link
							to={routes.pipelines.namespace(encodeURIComponent(name))}
							className="flex items-center gap-1"
						>
							<h2 className="text-text-md font-semibold">{name}</h2>
							<ExecutionStatusIcon status={status} />
							<CopyButton copyText={name} />
						</Link>
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
					runId: PipelineNamespaceBody["latest_run_id"];
					status: PipelineNamespaceBody["latest_run_status"];
				}>();

				return (
					<div>
						<Tag
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-0.5"
							color={"green"}
						>
							<RunIcon className={`h-3 w-3 ${getRunIconColor(status)}`} />
							{runId?.split("-")[0]}
						</Tag>
					</div>
				);
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
