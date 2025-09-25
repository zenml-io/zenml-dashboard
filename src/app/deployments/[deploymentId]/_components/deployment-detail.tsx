import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { CopyButton } from "@/components/CopyButton";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import { NotAvailable } from "@/components/not-available";
import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { PipelineLink } from "@/components/pipelines/pipeline-link";
import { Deployment } from "@/types/deployments";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

export function DeploymentDetail() {
	return <DeploymentDetailWrapper Component={DeploymentDetailContent} />;
}

type Props = {
	deployment: Deployment;
};

function DeploymentDetailContent({ deployment }: Props) {
	const [open, setOpen] = useState(true);

	const deploymentId = deployment.id;
	const snapshot = deployment.resources?.snapshot;
	const snapshotId = snapshot?.id;
	const snapshotName = snapshot?.name;

	const pipelineId = deployment.resources?.pipeline?.id;
	const pipelineName = deployment.resources?.pipeline?.name;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full gap-2">
					<CollapsibleChevron open={open} />
					Details
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue
						label="Id"
						value={
							<div className="group/copybutton flex items-center gap-0.5">
								{deploymentId}
								<CopyButton copyText={deploymentId} />
							</div>
						}
					/>
					<KeyValue
						label="Snapshot"
						value={
							snapshotId && snapshotName ? (
								<SnapshotLink snapshotId={snapshotId} snapshotName={snapshotName} />
							) : (
								<NotAvailable />
							)
						}
					/>
					<Key className="h-auto">Pipeline</Key>
					<Value className="h-auto">
						{pipelineId && pipelineName ? (
							<PipelineLink pipelineId={pipelineId} pipelineName={pipelineName} />
						) : (
							<NotAvailable />
						)}
					</Value>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
