import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { PipelineSnapshot } from "@/types/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { ComponentType } from "react";
import { useParams } from "react-router-dom";

type SnapshotDetailWrapperProps = {
	Component: ComponentType<{ snapshot: PipelineSnapshot }>;
};

export function SnapshotDetailWrapper({ Component }: SnapshotDetailWrapperProps) {
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

	return <Component snapshot={snapshot} />;
}
