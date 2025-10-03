import { deploymentQueries } from "@/data/deployments";
import { Deployment } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { ComponentType } from "react";
import { useParams } from "react-router-dom";

type DeploymentDetailWrapperProps = {
	Component: ComponentType<{ deployment: Deployment }>;
};

export function DeploymentDetailWrapper({ Component }: DeploymentDetailWrapperProps) {
	const { deploymentId } = useParams() as {
		deploymentId: string;
	};

	const deploymentQuery = useQuery({
		...deploymentQueries.detail(deploymentId),
		throwOnError: true
	});

	if (deploymentQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (deploymentQuery.isError) return null;

	const deployment = deploymentQuery.data;

	return <Component deployment={deployment} />;
}
