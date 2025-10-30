import { DockerImageCollapsible } from "@/components/runs/detail-tabs/Configuration/DockerImageCollapsible";
import { usePipelineBuild } from "@/data/pipeline-builds/all-pipeline-builds-query";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { Deployment } from "@/types/deployments";
import { BuildItem } from "@/types/pipeline-builds";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { AlertEmptyState } from "./common";
import { DeploymentDetailWrapper } from "./fetch-wrapper";

export function DockerBuildCollapsible() {
	return <DeploymentDetailWrapper Component={DockerBuildCollapsibleContent} />;
}

type Props = {
	deployment: Deployment;
};

function DockerBuildCollapsibleContent({ deployment }: Props) {
	const snapshotId = deployment.resources?.snapshot?.id;

	const snapshotQuery = useQuery(pipelineSnapshotQueries.detail(snapshotId!));
	const buildId = snapshotQuery.data?.resources?.build?.id;
	const buildQuery = usePipelineBuild(
		{
			buildId: buildId!
		},
		{ enabled: !!buildId }
	);

	if (!snapshotId) return null;

	if (snapshotQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (snapshotQuery.isError)
		return (
			<div>
				<AlertEmptyState
					title="Unable to get the docker build"
					subtitle="Something went wrong fetching the snapshot"
				/>
			</div>
		);

	if (!buildId) return null;

	if (buildQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (buildQuery.isError)
		return (
			<div>
				<AlertEmptyState
					title="Unable to get the docker build"
					subtitle="Something went wrong fetching the build"
				/>
			</div>
		);

	const build = buildQuery.data;
	const deployerImage = build.metadata?.images?.deployer as BuildItem | undefined;

	if (!deployerImage) {
		return null;
	}

	return <DockerImageCollapsible displayCopyButton={false} data={deployerImage} />;
}
