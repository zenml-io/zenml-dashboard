import { default as Barchart, default as BarChart } from "@/assets/icons/bar-chart.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { Button, Skeleton } from "@zenml-io/react-component-library";
import { FallbackProps } from "react-error-boundary";
import { Visualization } from "../Visualization";
import { useState } from "react";
import { VisualizationCombobox } from "../visualization-combobox";
import { DownloadButton } from "../visualization-download-button";
import { useArtifactLoadConfirmationContext } from "@/context/VisualizationConfirmationContext";
import { useArtifactVisualization } from "@/data/artifact-versions/artifact-visualization-query";

type Props = {
	artifactVersionId: string;
};

export function VisualizationTab({ artifactVersionId }: Props) {
	const [index, setIndex] = useState(0);
	const { isVisualizationConfirmed } = useArtifactLoadConfirmationContext();
	const [markdownMode, setMarkdownMode] = useState<"markdown" | "raw">("markdown");

	const { data, isPending, isError, error } = useArtifactVersion({
		versionId: artifactVersionId
	});

	const { data: loadedViz, isSuccess: hasViz } = useArtifactVisualization(
		{ versionId: artifactVersionId, params: { index } },
		{
			// Do not fetch before confirmation; rely on existing query/cache after confirmed
			retry: false,
			enabled: isVisualizationConfirmed(index)
		}
	);

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
			<div
				className={`flex gap-1 ${visualizations.length > 1 ? "justify-between" : "justify-end"}`}
			>
				{visualizations.length > 1 && (
					<VisualizationCombobox
						setIndex={setIndex}
						visualizations={visualizations}
						index={index}
					/>
				)}
				<div className="flex items-center gap-1">
					{isVisualizationConfirmed(index) && hasViz && loadedViz.type === "markdown" && (
						<Button
							intent="secondary"
							emphasis="subtle"
							size="md"
							className="flex items-center gap-1 bg-theme-surface-primary"
							onClick={() => setMarkdownMode((mode) => (mode === "markdown" ? "raw" : "markdown"))}
						>
							{markdownMode === "raw" ? "Markdown" : "Raw"}
						</Button>
					)}
					{isVisualizationConfirmed(index) && (
						<DownloadButton
							artifactName={data.body?.artifact.name || "artifact"}
							artifactVersionId={artifactVersionId}
							visualizationIndex={index}
						/>
					)}
				</div>
			</div>
			<Visualization
				artifactName={data.body?.artifact.name || "artifact"}
				visualizationIndex={index}
				artifactVersionId={artifactVersionId}
				markdownMode={markdownMode}
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
