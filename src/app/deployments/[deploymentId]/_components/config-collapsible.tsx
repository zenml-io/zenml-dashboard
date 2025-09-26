import { NestedCollapsible } from "@/components/NestedCollapsible";
import { componentQueries } from "@/data/components";
import { Deployment } from "@/types/deployments";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

type Props = {
	deployment: Deployment;
};

export function DeployerConfigCollapsible() {
	return <DeploymentDetailWrapper Component={DeployerConfigCollapsibleContent} />;
}

function DeployerConfigCollapsibleContent({ deployment }: Props) {
	const deployerId = deployment.resources?.deployer?.id;

	const deployerQuery = useQuery({
		...componentQueries.componentDetail(deployerId!),
		enabled: !!deployerId
	});

	if (!deployerId) return null;

	if (deployerQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (deployerQuery.isError) return null;

	const deployer = deployerQuery.data;

	return (
		<NestedCollapsible
			isInitialOpen
			title="Deployer Configuration"
			data={deployer.metadata?.configuration}
		/>
	);
}
