import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { Deployment } from "@/types/deployments";
import { NotAvailableTag } from "./not-available-tag";
import { PipelineTag } from "./pipeline-tag";

type Props = {
	deployment: Deployment;
};

export function DeploymentDetailHeaderInfoSubrow({ deployment }: Props) {
	const snapshotId = deployment.resources?.snapshot?.id;
	const snapshotName = deployment.resources?.snapshot?.name;
	const pipelineId = deployment.resources?.pipeline?.id;
	const pipelineName = deployment.resources?.pipeline?.name;

	return (
		<div className="flex items-center gap-5">
			<div className="flex items-center gap-[10px]">
				<div className="text-text-sm text-theme-text-secondary">Pipeline</div>
				{pipelineId && pipelineName ? (
					<PipelineTag pipelineId={pipelineId} pipelineName={pipelineName} />
				) : (
					<NotAvailableTag />
				)}
			</div>
			<div className="flex items-center gap-[10px]">
				<div className="text-text-sm text-theme-text-secondary">Snapshot</div>
				{snapshotId && snapshotName ? (
					<SnapshotLink size="xs" snapshotId={snapshotId} snapshotName={snapshotName} />
				) : (
					<NotAvailableTag />
				)}
			</div>
		</div>
	);
}
