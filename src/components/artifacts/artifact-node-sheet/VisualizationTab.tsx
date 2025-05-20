// import { Visualization } from "@/components/tenants-dashboard/artifacts/Visualization";
import { default as Barchart, default as BarChart } from "@/assets/icons/bar-chart.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { FallbackProps } from "react-error-boundary";
import { Visualization } from "../Visualization";
import { useState } from "react";
import { VisualizationCombobox } from "../visualization-combobox";
import { DownloadButton } from "../visualization-download-button";
import { useArtifactLoadConfirmationContext } from "@/context/VisualizationConfirmationContext";

type Props = {
	artifactVersionId: string;
};

export function VisualizationTab({ artifactVersionId }: Props) {
	const [index, setIndex] = useState(0);
	const { isVisualizationConfirmed } = useArtifactLoadConfirmationContext();

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

	const visualizations = data.metadata?.visualizations || [];

	if (visualizations.length < 1) {
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
		<div className="space-y-5">
			<div className={`flex ${visualizations.length > 1 ? "justify-between" : "justify-end"}`}>
				{visualizations.length > 1 && (
					<VisualizationCombobox
						setIndex={setIndex}
						visualizations={visualizations}
						index={index}
					/>
				)}
				{isVisualizationConfirmed(index) && (
					<DownloadButton
						artifactName={data.body?.artifact.name || "artifact"}
						artifactVersionId={artifactVersionId}
						visualizationIndex={index}
					/>
				)}
			</div>
			<Visualization
				artifactName={data.body?.artifact.name || "artifact"}
				visualizationIndex={index}
				artifactVersionId={artifactVersionId}
			/>
		</div>
	);
}

export function VisualizationErrorFallback({ error }: FallbackProps) {
	return (
		<EmptyState icon={<Barchart className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<p className="mb-2 text-display-xs font-semibold">Something went wrong</p>
				<p className="text-lg text-theme-text-secondary">{error.message}</p>
			</div>
		</EmptyState>
	);
}
