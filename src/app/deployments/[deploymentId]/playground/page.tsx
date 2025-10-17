import { deploymentQueries } from "@/data/deployments";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { getIsSafari } from "@/lib/environment";
import "@/monaco-setup";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PlaygroundEmptyState, PlaygroundError } from "./_components/error";
import { PlaygroundLoader } from "./_components/loader";
import { PlaygroundPageContent } from "./page.content";

export default function PlaygroundPage() {
	const { deploymentId } = useParams() as { deploymentId: string };

	const deploymentQuery = useQuery({
		...deploymentQueries.detail(deploymentId)
	});

	const snapshotId = deploymentQuery.data?.resources?.snapshot?.id;

	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId!),
		enabled: !!snapshotId
	});

	if (deploymentQuery.isPending) return <PlaygroundLoader subtitle="Loading Deployment..." />;
	if (deploymentQuery.isError) return <PlaygroundError error={deploymentQuery.error} />;

	if (!snapshotId) return <PlaygroundError error={new Error("Snapshot not found")} />;

	if (snapshotQuery.isPending) return <PlaygroundLoader subtitle="Loading Snapshot..." />;
	if (snapshotQuery.isError) return <PlaygroundError error={snapshotQuery.error} />;

	const snapshot = snapshotQuery.data;
	const deployment = deploymentQuery.data;
	const deploymentUrl = deployment.body?.url;

	if (deployment.body?.status !== "running" || !deploymentUrl)
		return (
			<PlaygroundEmptyState subtitle="Please make sure the deployment is running and has a URL" />
		);

	const isHttpsPage = window.location.protocol === "https:";
	const isHttpDeployment = deploymentUrl.startsWith("http://");
	const isSafari = getIsSafari();

	if (isHttpsPage && isHttpDeployment && isSafari) {
		const errorMessage =
			"Safari doesn’t allow HTTPS pages to connect to local HTTP services. Please use Chrome or Firefox, or run your local service with HTTPS.";

		return <PlaygroundEmptyState title="Cannot invoke deployment" subtitle={errorMessage} />;
	}

	return <PlaygroundPageContent snapshot={snapshot} deployment={deployment} />;
}
