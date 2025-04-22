import File from "@/assets/icons/file.svg?react";
import { EmptyState } from "../../EmptyState";
import { Skeleton } from "@zenml-io/react-component-library";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { ErrorFallback } from "@/components/Error";
import { MetadataCards, UncategorizedCard } from "@/components/MetadataCards";
import { MetadataMap } from "@/types/common";

type Props = {
	artifactVersionId: string;
};

export function ArtifactMetadataTab({ artifactVersionId }: Props) {
	const { data, isError, error } = useArtifactVersion({
		versionId: artifactVersionId
	});

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	if (!data?.metadata?.run_metadata || Object.keys(data.metadata.run_metadata).length === 0) {
		return (
			<EmptyState icon={<File className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="mb-2 text-display-xs font-semibold">No metadata found</p>
					<p className="text-text-lg text-theme-text-secondary">
						There are no metadata available for this artifact.
					</p>
				</div>
			</EmptyState>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			{data ? (
				<UncategorizedCard metadata={data.metadata?.run_metadata as MetadataMap} />
			) : (
				<Skeleton className="h-9 w-full" />
			)}

			{data ? (
				<MetadataCards metadata={data.metadata?.run_metadata as MetadataMap} />
			) : (
				<Skeleton className="h-9 w-full" />
			)}
		</div>
	);
}
