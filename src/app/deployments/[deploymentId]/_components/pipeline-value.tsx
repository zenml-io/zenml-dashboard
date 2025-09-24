import { NotAvailable } from "@/components/not-available";
import { PipelineLink } from "@/components/pipelines/pipeline-link";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";

type Props = {
	snapshotId: string | undefined;
};

export function PipelineValue({ snapshotId }: Props) {
	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId!),
		enabled: !!snapshotId
	});

	if (!snapshotId) return <NotAvailable />;

	if (snapshotQuery.isPending) return <Skeleton className="h-6 w-[150px]" />;
	if (snapshotQuery.isError) return <NotAvailable />;

	const snapshot = snapshotQuery.data;

	const pipelineId = snapshot?.metadata?.pipeline.id;
	const pipelineName = snapshot?.metadata?.pipeline.name;

	if (!pipelineId || !pipelineName) return <NotAvailable />;

	return <PipelineLink pipelineId={pipelineId} pipelineName={pipelineName} />;
}
