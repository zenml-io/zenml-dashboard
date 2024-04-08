import { ErrorFallback } from "@/components/Error";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { CodeCard, DataCard } from "./DetailCards";

type Props = {
	artifactVersionId: string;
};

export function ArtifactDetailTab({ artifactVersionId }: Props) {
	const { data, isError, error } = useArtifactVersion({
		versionId: artifactVersionId
	});

	if (isError) {
		return <ErrorFallback err={error} />;
	}

	return (
		<div className="space-y-5">
			{data ? (
				// <DetailsCard className="lg:col-span-2" artifactVersion={data} />
				<div></div>
			) : (
				<Skeleton className="h-[500px] rounded-md lg:col-span-2" />
			)}
			{data ? (
				<DataCard artifactVersionId={data.id} />
			) : (
				<Skeleton className="h-[500px] rounded-md lg:col-span-2" />
			)}
			{data ? (
				<CodeCard artifactVersionId={data.id} />
			) : (
				<Skeleton className="h-[500px] rounded-md lg:col-span-2" />
			)}
		</div>
	);
}
