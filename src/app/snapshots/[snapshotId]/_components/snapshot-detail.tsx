import { useParams } from "react-router-dom";
import { DetailsContent } from "./snapshot-detail-content";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";

export function SnapshotDetails() {
	const { snapshotId } = useParams() as {
		snapshotId: string;
	};

	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId),
		throwOnError: true
	});

	if (snapshotQuery.isPending) return <Skeleton className="h-[200px] w-full" />;
	if (snapshotQuery.isError) return null;

	const snapshot = snapshotQuery.data;

	return <DetailsContent snapshot={snapshot} />;
}
