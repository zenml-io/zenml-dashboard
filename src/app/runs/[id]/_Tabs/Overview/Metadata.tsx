import { Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { EmptyCards, MetadataCards, UncategorizedCard } from "@/components/MetadataCards";
import { MetadataMap } from "@/types/common";

export function Metadata() {
	const { runId } = useParams() as { runId: string };

	const { data, isError, isPending } = usePipelineRun({ runId: runId }, { throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (!data.metadata?.run_metadata || Object.keys(data.metadata.run_metadata).length === 0) {
		return <EmptyCards />;
	}

	return (
		<div className="flex flex-col gap-5">
			<UncategorizedCard metadata={data?.metadata?.run_metadata as MetadataMap} />
			<MetadataCards metadata={data?.metadata?.run_metadata as MetadataMap} />
		</div>
	);
}
