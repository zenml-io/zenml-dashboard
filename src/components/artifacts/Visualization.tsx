import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { useArtifactLoadConfirmationContext } from "@/context/VisualizationConfirmationContext";
import {
	getArtifactVisualizationQueryKey,
	useArtifactVisualization
} from "@/data/artifact-versions/artifact-visualization-query";
import { ArtifactVisualizationQueryParams, LoadedVisualization } from "@/types/artifact-versions";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Spinner } from "@zenml-io/react-component-library";
import { useState } from "react";
import { EmptyState } from "../EmptyState";
import { InfoBox } from "../Infobox";
import { HTMLVisualization } from "./HtmlVisualization";
import { ImageVisualization } from "./ImageVisualization";
import { JSONVisualization } from "./JsonVisualization";
import { DownloadButton } from "./visualization-download-button";
import MarkdownVisualization from "./MarkdownVisualization";
import CSVVisualization from "./CsvVizualization";
import { useVisualizationUIState } from "@/context/VisualizationUIStateContext";

export type Props = {
	content: string;
};

type VisualizationProps = {
	artifactVersionId: string;
	artifactName: string;
	visualizationIndex?: number;
};

export function Visualization({
	artifactVersionId,
	artifactName,
	visualizationIndex = 0
}: VisualizationProps) {
	const [isCancelled, setIsCancelled] = useState(false);
	const params: ArtifactVisualizationQueryParams = {
		index: visualizationIndex
	};

	const { isVisualizationConfirmed, confirmVisualization } = useArtifactLoadConfirmationContext();

	const queryClient = useQueryClient();

	const { data, isError, error, isPending } = useArtifactVisualization(
		{ versionId: artifactVersionId, params },
		{ retry: false, enabled: !isCancelled }
	);

	const { getMarkdownMode } = useVisualizationUIState();

	if (isCancelled) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="flex flex-col items-center text-center">
					<p className="mb-5 text-text-lg text-theme-text-secondary">
						Loading the visualization cancelled
					</p>
					<Button size="md" onClick={() => setIsCancelled(false)}>
						Load Visualization
					</Button>
				</div>
			</EmptyState>
		);
	}

	if (isError) {
		if (error.status === 501) {
			return (
				<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
					<p className="text-center text-text-lg text-theme-text-secondary">
						This artifact cannot be visualized because it cannot be loaded from the artifact store.
						This might happen if your ZenML server does not have the artifact stores dependencies
						installed or if the server is not authenticated to access it. For more information, see
						our{" "}
						<a
							className="link"
							rel="noopener noreferrer"
							target="_blank"
							href="https://docs.zenml.io/stacks/stack-components/artifact-stores/custom"
						>
							docs
						</a>
					</p>
				</EmptyState>
			);
		}
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="text-text-lg text-theme-text-secondary">{error.message}</p>
				</div>
			</EmptyState>
		);
	}

	if (isPending) {
		return (
			<div className="flex flex-col items-center gap-7 py-12">
				<Spinner />
				<div className="flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading Visualization</p>
					<Button
						onClick={() => {
							queryClient.cancelQueries({
								queryKey: getArtifactVisualizationQueryKey({
									versionId: artifactVersionId
								})
							});
							setIsCancelled(true);
						}}
						intent="secondary"
						size="md"
					>
						Cancel
					</Button>
				</div>
			</div>
		);
	}

	if (!isVisualizationConfirmed(visualizationIndex)) {
		return (
			<ConfirmDisplay
				artifactVersionId={artifactVersionId}
				visualizationIndex={visualizationIndex}
				artifactName={artifactName}
				confirmVisualization={() => confirmVisualization(visualizationIndex)}
				{...data}
			/>
		);
	}

	return (
		<div>
			{data.type === "image" && <ImageVisualization content={data.value} />}
			{data.type === "html" && <HTMLVisualization content={data.value} />}
			{data.type === "markdown" && (
				<MarkdownVisualization content={data.value} mode={getMarkdownMode(visualizationIndex)} />
			)}
			{data.type === "csv" && <CSVVisualization content={data.value} />}
			{data.type === "json" && <JSONVisualization content={data.value} />}
		</div>
	);
}

function ConfirmDisplay({
	artifactName,
	confirmVisualization,
	artifactVersionId,
	visualizationIndex
}: LoadedVisualization & {
	artifactName: string;
	confirmVisualization: () => void;
	artifactVersionId: string;
	visualizationIndex: number;
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<InfoBox>
				This preview may contain harmful code. Only proceed if you trust the source. Loading content
				from untrusted sources can pose risks. If unsure, avoid loading.
			</InfoBox>
			<div className="flex justify-center gap-4">
				<Button size="md" onClick={() => confirmVisualization()}>
					Load Preview
				</Button>
				<DownloadButton
					artifactVersionId={artifactVersionId}
					visualizationIndex={visualizationIndex}
					artifactName={artifactName}
				/>
			</div>
		</div>
	);
}
