import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { Deployment } from "@/types/deployments";
import { Tag } from "@zenml-io/react-component-library/components/server";

type Props = {
	deployment: Deployment;
};

export function DeploymentDetailHeaderInfoSubrow({ deployment }: Props) {
	const snapshotId = deployment.resources?.snapshot?.id;
	const snapshotName = deployment.resources?.snapshot?.name;
	return (
		<div className="flex items-center gap-5">
			<div className="flex items-center gap-[10px]">
				<div className="text-text-sm text-theme-text-secondary">Snapshot</div>
				{snapshotId && snapshotName ? (
					<SnapshotLink size="xs" snapshotId={snapshotId} snapshotName={snapshotName} />
				) : (
					<Tag size="xs" rounded={false} emphasis="subtle" color="grey">
						Not available
					</Tag>
				)}
			</div>
		</div>
	);
}
