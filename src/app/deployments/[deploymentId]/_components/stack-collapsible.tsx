"use client";

import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { EmptyState } from "@/components/EmptyState";
import { StackInfo } from "@/components/stacks/info";
import { Deployment } from "@/types/deployments";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

type DeploymentStackCollapsibleContentProps = {
	deployment: Deployment;
};

export function DeploymentStackCollapsible() {
	return <DeploymentDetailWrapper Component={DeploymentStackCollapsibleContent} />;
}

function DeploymentStackCollapsibleContent({ deployment }: DeploymentStackCollapsibleContentProps) {
	const stack = deployment.resources?.stack;

	if (!stack) {
		return <NoStackEmptyState />;
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
