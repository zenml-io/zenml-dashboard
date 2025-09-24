import File from "@/assets/icons/file.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { MetadataCards, UncategorizedCard } from "@/components/MetadataCards";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { MetadataMap } from "@/types/common";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	runId: string;
};

export function MetadataTab({ runId }: Props) {
	const { data, isError } = usePipelineRun({ runId }, { throwOnError: true });

	if (isError) return <p>Failed to fetch pipeline run</p>;

	if (data && Object.entries(data.metadata?.run_metadata || {}).length < 1) {
		return (
			<EmptyState icon={<File className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="mb-2 text-display-xs font-semibold">No metadata found</p>
					<p className="text-text-lg text-theme-text-secondary">There are no metadata available.</p>
				</div>
			</EmptyState>
		);
	}

	return (
		<section className="flex flex-col gap-5">
			{data ? (
				<UncategorizedCard metadata={data.metadata?.run_metadata as any} />
			) : (
				<Skeleton className="h-[200px] w-full" />
			)}
			{data ? (
				<MetadataCards metadata={data.metadata?.run_metadata as MetadataMap} />
			) : (
				<Skeleton className="h-[200px] w-full" />
			)}
		</section>
	);
}
