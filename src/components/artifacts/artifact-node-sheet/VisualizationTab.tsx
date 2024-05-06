// import { Visualization } from "@/components/tenants-dashboard/artifacts/Visualization";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { EmptyState } from "@/components/EmptyState";
import BarChart from "@/assets/icons/bar-chart.svg?react";
import { Visualization } from "../Visualization";
import { MetadataMap } from "@/types/common";
import { useState } from "react";
import { FIVEMEGABYTES } from "@/lib/constants";

type Props = {
	artifactVersionId: string;
};

export function VisualizationTab({ artifactVersionId }: Props) {
	const [confirmation, setConfirmation] = useState(false);
	const { data, isPending, isError, error } = useArtifactVersion({
		versionId: artifactVersionId
	});

	if (isError) {
		return (
			<EmptyState icon={<BarChart className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="text-text-lg text-theme-text-secondary">{error.message}</p>
				</div>
			</EmptyState>
		);
	}

	if (isPending) {
		return <Skeleton className="h-[300px] w-full" />;
	}

	const size = (data.metadata?.run_metadata as MetadataMap)?.storage_size?.body?.value;

	if (data.metadata?.visualizations && data.metadata.visualizations.length < 1) {
		return (
			<EmptyState icon={<BarChart className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="mb-2 text-display-xs font-semibold">No visualizations found</p>
					<p className="text-text-lg text-theme-text-secondary">
						There are no visualizations available for this artifact version.
					</p>
				</div>
			</EmptyState>
		);
	}

	return (
		<div>
			{size < FIVEMEGABYTES || confirmation ? (
				<Visualization
					artifactName={data.body?.artifact.name || "artifact"}
					artifactVersionId={artifactVersionId}
				/>
			) : (
				<div className="flex h-full w-full flex-col items-center justify-center">
					<p className="mb-4">Artifact Visualization is larger than 5MB. Confirm to proceed:</p>
					<Button onClick={() => setConfirmation(true)} size="md">
						Confirm
					</Button>
				</div>
			)}
		</div>
	);
}
