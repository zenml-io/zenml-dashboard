import { ColumnDef } from "@tanstack/react-table";
import { PipelineNamespace, PipelineNamespaceBody } from "@/types/pipelines";
import { Tag } from "@zenml-io/react-component-library";

export function getPipelineColumns(): ColumnDef<PipelineNamespace>[] {
	return [
		{
			id: "name",
			header: "Pipeline",
			accessorFn: (row) => ({ name: row.name, status: row.body?.latest_run_status }),
			cell: ({ getValue }) => {
				const { name } = getValue<{
					name: PipelineNamespace["name"];
					status: PipelineNamespaceBody["latest_run_status"];
				}>();

				return (
					<div className="group/copybutton flex items-center gap-2">
						{/* <PipelineIcon className={`h-5 w-5 ${getExecutionStatusColor(status)}`} /> */}
						<div className="flex items-center gap-1">
							<h2 className="text-text-md font-semibold">{name}</h2>
							{/* <ExecutionStatusIcon status={status} />
							<CopyButton copyText={name} /> */}
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
				const { runId } = getValue<{
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
							{/* <RunIcon className={`h-3 w-3 ${getRunIconColor(status)}`} /> */}
							{runId?.split("-")[0]}
						</Tag>
					</div>
				);
			}
		}
	];
}
