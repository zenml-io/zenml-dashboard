import PipelineIcon from "@/assets/icons/pipeline.svg?react";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { NotAvailableTag } from "./not-available-tag";
type Props = {
	snapshotId: string | undefined;
};

export function PipelineTag({ snapshotId }: Props) {
	const snapshotQuery = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId!),
		enabled: !!snapshotId
	});

	if (!snapshotId) return <NotAvailableTag />;

	if (snapshotQuery.isPending) return <Skeleton className="h-5 w-[150px]" />;
	if (snapshotQuery.isError) return <NotAvailableTag />;

	const snapshot = snapshotQuery.data;

	const pipelineId = snapshot?.metadata?.pipeline.id;
	const pipelineName = snapshot?.metadata?.pipeline.name;

	if (!pipelineId || !pipelineName) return <NotAvailableTag />;

	return (
		<Link to={routes.projects.pipelines.detail.runs(pipelineId)}>
			<Tag
				size="xs"
				color="purple"
				className="inline-flex items-center gap-0.5 text-primary-400"
				rounded={false}
				emphasis="minimal"
			>
				<PipelineIcon className="size-3 shrink-0 fill-primary-400" />
				{pipelineName}
			</Tag>
		</Link>
	);
}
