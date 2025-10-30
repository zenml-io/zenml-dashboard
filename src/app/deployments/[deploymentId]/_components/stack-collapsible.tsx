"use client";

import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { StackInfoFull } from "@/components/stacks/info/stack-info-full";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useStack } from "@/data/stacks/stack-detail-query";
import { Deployment } from "@/types/deployments";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { DeploymentDetailWrapper } from "./fetch-wrapper";
import { CollapsibleCard } from "@/components/CollapsibleCard";

type DeploymentStackCollapsibleContentProps = {
	deployment: Deployment;
};

export function DeploymentStackCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentStackCollapsibleContent} />;
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
			<StackCollapsibleEmptyState
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
			<StackCollapsibleEmptyState
				title="Failed to fetch the stack"
				subtitle="Something went wrong fetching the stack"
			/>
		);
	}

	const stack = stackQuery.data;

	const snapshotConfig = snapshot.metadata?.pipeline_configuration.settings || {};

	return <StackInfoFull stack={stack} objectConfig={snapshotConfig} />;
}

function StackCollapsibleEmptyState({ title, subtitle }: { title: string; subtitle?: string }) {
	return (
		<CollapsibleCard title="Stack" initialOpen={true}>
			<EmptyState
				className="p-5"
				icon={<AlertCircle className="h-[60px] w-[60px] fill-neutral-300" />}
			>
				<div className="text-center">
					<p className="text-text-lg font-semibold">{title}</p>
					{subtitle && <p className="text-text-md text-theme-text-secondary">{subtitle}</p>}
				</div>
			</EmptyState>
		</CollapsibleCard>
	);
}

function NoStackEmptyState() {
	return (
		<StackCollapsibleEmptyState
			title="No Stack"
			subtitle="There is no stack associated with this deployment."
		/>
	);
}
