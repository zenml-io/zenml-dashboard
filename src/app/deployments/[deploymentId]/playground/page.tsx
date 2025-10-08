import { deploymentQueries } from "@/data/deployments";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import "@/monaco-setup";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PlaygroundError } from "./_components/error";
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

	return <PlaygroundPageContent snapshot={snapshot} deployment={deployment} />;
}
