import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { stackQueries } from "@/data/stacks";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useParams } from "react-router-dom";
import { StackContent } from "./snapshot-stack-content";

export function SnapshotStack() {
	const { snapshotId } = useParams() as {
		snapshotId: string;
	};

	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId)
	});
	const stackId = snapshotQuery.data?.resources?.stack?.id;
	const stackQuery = useQuery({
		...stackQueries.stackDetail(stackId ?? ""),
		enabled: !!stackId
	});

	if (snapshotQuery.isPending) {
		return <Skeleton className="h-[300px] w-full" />;
	}

	if (snapshotQuery.isError) {
		return <div>Failed to load snapshot.</div>;
	}

	if (!stackId) {
		return <div>Stack not available for this snapshot.</div>;
	}

	if (stackQuery.isPending) {
		return <Skeleton className="h-[300px] w-full" />;
	}

	if (stackQuery.isError) {
		return <div>Failed to load stack.</div>;
	}

	return <StackContent stack={stackQuery.data} />;
}
