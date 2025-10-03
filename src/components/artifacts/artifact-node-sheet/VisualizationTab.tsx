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
import { VisualizationUIStateProvider } from "@/context/VisualizationUIStateContext";
import { MarkdownViewToggle } from "../MarkdownViewToggle";
import { useArtifactVisualization } from "@/data/artifact-versions/artifact-visualization-query";

type Props = {
	artifactVersionId: string;
};

export function VisualizationTab({ artifactVersionId }: Props) {
	const [index, setIndex] = useState(0);
	const { isVisualizationConfirmed } = useArtifactLoadConfirmationContext();

	const { data, isPending, isError, error } = useArtifactVersion({
		versionId: artifactVersionId
	});

	const isConfirmed = isVisualizationConfirmed(index);
	const { data: loadedViz, isSuccess: hasViz } = useArtifactVisualization(
		{ versionId: artifactVersionId, params: { index } },
		{
			// Do not fetch before confirmation; rely on existing query/cache after confirmed
			retry: false,
			enabled: isConfirmed
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

	return (
		<VisualizationUIStateProvider>
			<div className="space-y-5">
				<div
					className={`flex ${visualizations.length > 1 ? "justify-between" : "justify-end"} items-center`}
				>
					{visualizations.length > 1 && (
						<VisualizationCombobox
							setIndex={setIndex}
							visualizations={visualizations}
							index={index}
						/>
					)}
					<div className="flex items-center gap-2">
						{isConfirmed && hasViz && loadedViz?.type === "markdown" && (
							<MarkdownViewToggle index={index} />
						)}
						{isConfirmed && (
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
				/>
			</div>
		</VisualizationUIStateProvider>
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
