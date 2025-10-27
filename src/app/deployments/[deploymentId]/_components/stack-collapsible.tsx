"use client";

import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { EmptyState } from "@/components/EmptyState";
import { StackInfo } from "@/components/stacks/info";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useStack } from "@/data/stacks/stack-detail-query";
import { Deployment } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

type DeploymentStackCollapsibleContentProps = {
	deployment: Deployment;
};

export function DeploymentStackCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentStackCollapsibleContent} />;
}

function DeploymentStackCollapsibleContent({ deployment }: DeploymentStackCollapsibleContentProps) {
	const snapshot = deployment.resources?.snapshot;

	if (!snapshot?.id) {
		return <NoStackEmptyState />;
	}

	return <DeploymentStackCollapsibleWithSnapshot deployment={deployment} snapshot={snapshot} />;
}

type DeploymentSnapshot = NonNullable<NonNullable<Deployment["resources"]>["snapshot"]>;

function DeploymentStackCollapsibleWithSnapshot({
	deployment,
	snapshot
}: {
	deployment: Deployment;
	snapshot: DeploymentSnapshot;
}) {
	const snapshotId = snapshot.id;
	const shouldFetchSnapshot = !snapshot.resources?.stack?.id;

	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId),
		enabled: shouldFetchSnapshot
	});

	if (shouldFetchSnapshot && snapshotQuery.isPending) {
		return <Skeleton className="h-[250px] w-full" />;
	}

	if (shouldFetchSnapshot && snapshotQuery.isError) {
		return <p>Something went wrong fetching the snapshot</p>;
	}

	const stackId = snapshot.resources?.stack?.id ?? snapshotQuery.data?.resources?.stack?.id;

	if (!stackId) {
		return <NoStackEmptyState />;
	}

	return <DeploymentStackCollapsibleStackSection deployment={deployment} stackId={stackId} />;
}

function DeploymentStackCollapsibleStackSection({
	deployment,
	stackId
}: {
	deployment: Deployment;
	stackId: string;
}) {
	const {
		data: stack,
		isPending: isStackPending,
		isError: isStackError,
		error: stackError
	} = useStack({ stackId });

	if (isStackPending) {
		return <Skeleton className="h-[250px] w-full" />;
	}

	if (isStackError || !stack) {
		if ((stackError as { status?: number } | undefined)?.status === 403) {
			return (
				<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
					<p className="mb-2 text-display-xs font-semibold">Insufficient permissions</p>
					<p className="text-text-lg text-theme-text-secondary">
						You do not have permission to view this stack.
					</p>
				</EmptyState>
			);
		}
		return <p>Failed to fetch Stack</p>;
	}

	const config =
		(deployment.metadata?.config?.settings as Record<string, unknown> | undefined) ?? {};

	return (
		<CollapsibleCard title="Stack" initialOpen={true}>
			<StackInfo stack={stack} objectConfig={config} />
		</CollapsibleCard>
	);
}

function NoStackEmptyState() {
	return (
		<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<p className="text-display-xs font-semibold">No Stack</p>
				<p className="text-text-lg text-theme-text-secondary">
					There is no stack associated with this deployment.
				</p>
			</div>
		</EmptyState>
	);
}
