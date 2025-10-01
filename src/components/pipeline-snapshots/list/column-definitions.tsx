import SnapshotIcon from "@/assets/icons/snapshot.svg?react";
import RunIcon from "@/assets/icons/terminal-square.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DeploymentStatusTag } from "@/components/deployments/deployment-status-tag";
import { DisplayDate } from "@/components/DisplayDate";
import { getExecutionStatusTagColor, getRunIconColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { routes } from "@/router/routes";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox, Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { PipelineSnapshotActions } from "../table-actions";
import { getFirstUuidSegment } from "@/lib/strings";
import { PipelineLink } from "@/components/pipelines/pipeline-link";

export function createSnapshotCheckColumn(): ColumnDef<PipelineSnapshot> {
	return {
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
	};
}

export function createSnapshotNameColumn(): ColumnDef<PipelineSnapshot> {
	return {
		id: "name",
		header: "Snapshot",
		accessorFn: (row) => row.name,
		cell: ({ row }) => {
			const name = row.original.name;
			const id = row.original.id;
			return (
				<div className="group/copybutton flex items-center gap-2">
					<SnapshotIcon className={`h-5 w-5 fill-primary-400`} />
					<div>
						<div className="flex items-center gap-1">
							<Link
								to={routes.projects.snapshots.detail.overview(id)}
								className="flex items-center gap-1"
							>
								<span className="text-text-md font-semibold text-theme-text-primary">
									{name ?? "Unnamed"}
								</span>
							</Link>

							<CopyButton copyText={name ?? ""} />
						</div>
						<Link
							to={routes.projects.snapshots.detail.overview(id)}
							className="flex items-center gap-1"
						>
							<p className="text-text-xs text-theme-text-secondary">{getFirstUuidSegment(id)}</p>
							<CopyButton copyText={id} />
						</Link>
					</div>
				</div>
			);
		}
	};
}

export function createSnapshotDeploymentColumn(): ColumnDef<PipelineSnapshot> {
	return {
		id: "deployment",
		header: "Deployment",
		accessorFn: (row) => row.resources?.deployment?.id,
		cell: ({ row }) => {
			const deployment = row.original.resources?.deployment;
			const status = deployment?.body?.status;
			const id = deployment?.id;
			if (!status || !id) return null;
			return (
				<Link to={routes.projects.deployments.detail.overview(id)}>
					<DeploymentStatusTag status={status} />
				</Link>
			);
		}
	};
}

export function createSnapshotPipelineColumn(): ColumnDef<PipelineSnapshot> {
	return {
		id: "pipeline",
		header: "Pipeline",
		accessorFn: (row) => row.resources?.pipeline?.name,
		cell: ({ row }) => {
			const pipeline = row.original.resources?.pipeline;
			if (!pipeline) return null;
			return <PipelineLink pipelineId={pipeline.id} pipelineName={pipeline.name} />;
		}
	};
}

export function createSnapshotLatestRunColumn(): ColumnDef<PipelineSnapshot> {
	return {
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
	};
}

export function createSnapshotLatestRunAuthorColumn(): ColumnDef<PipelineSnapshot> {
	return {
		id: "latest-run-author",
		header: "Latest Run Author",
		accessorFn: (row) => row.resources?.latest_run_author,
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
	};
}

export function createSnapshotCreatedColumn(): ColumnDef<PipelineSnapshot> {
	return {
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
	};
}

export function createSnapshotAdminActionsColumn(): ColumnDef<PipelineSnapshot> {
	return {
		id: "admin_actions",
		header: "",
		accessorFn: (row) => row.id,
		cell: ({ row }) => {
			const snapshotId = row.original.id;

			return <PipelineSnapshotActions snapshotId={snapshotId} />;
		}
	};
}
