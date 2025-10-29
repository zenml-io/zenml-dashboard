import { CollapsibleCard } from "@/components/CollapsibleCard";
import { StackInfo } from "@/components/stacks/info";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useStack } from "@/data/stacks/stack-detail-query";
import { Deployment } from "@/types/deployments";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { AlertEmptyState } from "./common";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

type DeploymentStackCollapsibleContentProps = {
	deployment: Deployment;
};

export function DeploymentStackCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentStackCollapsibleWrapper} />;
}

function DeploymentStackCollapsibleWrapper({ deployment }: DeploymentStackCollapsibleContentProps) {
	return (
		<CollapsibleCard title="Stack" initialOpen={true}>
			<DeploymentStackCollapsibleContent deployment={deployment} />
		</CollapsibleCard>
	);
}

function DeploymentStackCollapsibleContent({ deployment }: DeploymentStackCollapsibleContentProps) {
	const snapshot = deployment.resources?.snapshot;

	if (!snapshot) {
		return <NoStackEmptyState />;
	}

	return <DeploymentStackCollapsibleWithSnapshot snapshotId={snapshot.id} />;
}

function DeploymentStackCollapsibleWithSnapshot({ snapshotId }: { snapshotId: string }) {
	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId)
	});

	if (snapshotQuery.isPending) {
		return <Skeleton className="h-[200px] w-full" />;
	}

	if (snapshotQuery.isError) {
		return (
			<AlertEmptyState
				title="Unable to get Stack"
				subtitle="Something went wrong fetching the deployment snapshot"
			/>
		);
	}

	const stackId = snapshotQuery.data?.resources?.stack?.id;

	if (!stackId) {
		return <NoStackEmptyState />;
	}

	return <DeploymentStackCollapsibleStackSection snapshot={snapshotQuery.data} stackId={stackId} />;
}

function DeploymentStackCollapsibleStackSection({
	snapshot,
	stackId
}: {
	snapshot: PipelineSnapshot;
	stackId: string;
}) {
	const stackQuery = useStack({ stackId });

	if (stackQuery.isPending) {
		return <Skeleton className="h-[200px] w-full" />;
	}

	if (stackQuery.isError) {
		return (
			<AlertEmptyState
				title="Unable to get Stack"
				subtitle="Something went wrong fetching the stack"
			/>
		);
	}

	const stack = stackQuery.data;

	const snapshotConfig = snapshot.metadata?.pipeline_configuration.settings || {};

	return <StackInfo displayInfoBox={false} stack={stack} objectConfig={snapshotConfig} />;
}

function NoStackEmptyState() {
	return (
		<AlertEmptyState
			title="No Stack"
			subtitle="There is no stack associated with this deployment."
		/>
	);
}
