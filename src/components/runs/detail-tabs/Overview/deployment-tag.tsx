import { DeploymentStatusTag } from "@/components/deployments/deployment-status-tag";
import { deploymentQueries } from "@/data/deployments";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";

type Props = {
	deploymentId: string;
};

export function DeploymentTag({ deploymentId }: Props) {
	const deploymentQuery = useQuery(deploymentQueries.detail(deploymentId));

	if (deploymentQuery.isPending) return <Skeleton className="h-6 w-[100px]" />;
	if (deploymentQuery.isError) return "Not available";

	const deployment = deploymentQuery.data;

	return (
		<Link to={routes.projects.deployments.detail.overview(deploymentId)}>
			<DeploymentStatusTag size="sm" status={deployment.body?.status ?? undefined} />
		</Link>
	);
}
