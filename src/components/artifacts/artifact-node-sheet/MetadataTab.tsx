import { EmptyState } from "../../EmptyState";
import { Skeleton } from "@zenml-io/react-component-library";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { ErrorFallback } from "@/components/Error";
import { MetadataCards, UncategorizedCard } from "@/components/MetadataCards";
import { MetadataMap } from "@/types/common";
import { Icon } from "@/components/Icon";

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

	if (!data?.metadata) {
		return (
			<EmptyState icon={<Icon name="file" className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<h1 className="mb-2 text-display-xs font-semibold">
						No Metadata Found for this Artifact
					</h1>
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
