import Rocket from "@/assets/icons/rocket.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DeploymentStatusTag } from "@/components/deployments/deployment-status-tag";
import { DisplayDate } from "@/components/DisplayDate";
import { InlineAvatar } from "@/components/InlineAvatar";
import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { PipelineLink } from "@/components/pipelines/pipeline-link";
import { getFirstUuidSegment } from "@/lib/strings";
import { routes } from "@/router/routes";
import { Deployment } from "@/types/deployments";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function DeploymentNameColumn(): ColumnDef<Deployment> {
	return {
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
						<div className="flex items-center gap-1">
							<Link
								to={routes.projects.deployments.detail.overview(id)}
								className="flex items-center gap-1"
							>
								<p className="text-text-xs text-theme-text-secondary">{getFirstUuidSegment(id)}</p>
							</Link>
							<CopyButton copyText={id} />
						</div>
					</div>
				</div>
			);
		}
	};
}

export function DeploymentStatusColumn(): ColumnDef<Deployment> {
	return {
		id: "status",
		header: "Status",
		accessorFn: (row) => row.body?.status,
		cell: ({ row }) => {
			const status = row.original.body?.status;
			if (!status) return <div>No status</div>;

			return <DeploymentStatusTag size="sm" status={status} />;
		}
	};
}

export function DeploymentPipelineColumn(): ColumnDef<Deployment> {
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

export function DeploymentSnapshotColumn(): ColumnDef<Deployment> {
	return {
		id: "snapshot",
		header: "Snapshot",
		accessorFn: (row) => row.resources?.snapshot?.name,
		cell: ({ row }) => {
			const snapshot = row.original.resources?.snapshot;
			const snapshotName = snapshot?.name;
			const snapshotId = snapshot?.id;
			if (!snapshotName || !snapshotId) return null;
			return <SnapshotLink size="sm" snapshotId={snapshotId} snapshotName={snapshotName} />;
		}
	};
}

export function DeploymentAuthorColumn(): ColumnDef<Deployment> {
	return {
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
	};
}

export function DeploymentCreatedColumn(): ColumnDef<Deployment> {
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
