import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import {
	getArtifactVisualizationQueryKey,
	useArtifactVisualization
} from "@/data/artifact-versions/artifact-visualization-query";
import { ArtifactVisualization } from "@/types/artifact-versions";
import { useQueryClient } from "@tanstack/react-query";
import { Button, ButtonProps, Spinner } from "@zenml-io/react-component-library";
import { Dispatch, SetStateAction, lazy, useState } from "react";
import { EmptyState } from "../EmptyState";
import { HTMLVisualization } from "./HtmlVisualization";
import { ImageVisualization } from "./ImageVisualization";
import InfoBox from "../Infobox";
import { useArtifactLoadConfirmationContext } from "@/context/VisualizationConfirmationContext";

const CSVVisualization = lazy(() => import("./CsvVizualization"));
const MarkdownVisualization = lazy(() => import("./MarkdownVisualization"));

export type Props = {
	content: string;
};

type VisualizationProps = {
	artifactVersionId: string;
	artifactName: string;
};

export function Visualization({ artifactVersionId, artifactName }: VisualizationProps) {
	const [isCancelled, setIsCancelled] = useState(false);
	const { isVisualizationConfirmed, setVisualizationConfirmed } =
		useArtifactLoadConfirmationContext();

	const queryClient = useQueryClient();

	const { data, isError, error, isPending } = useArtifactVisualization(
		{ versionId: artifactVersionId },
		{ retry: false, enabled: !isCancelled }
	);

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
					<p>
						This artifact cannot be visualized because it cannot be loaded from the artifact store.
						This might happen if your ZenML server does not have the artifact stores dependencies
						installed or if the server is not authenticated to access it. For more information, see
						our
					</p>
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://docs.zenml.io/stacks-and-components/component-guide/artifact-stores/custom"
					>
						docs
					</a>
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

	if (!isVisualizationConfirmed) {
		return (
			<ConfirmDisplay
				artifactName={artifactName}
				setConfirmed={setVisualizationConfirmed}
				{...data}
			/>
		);
	}

	return (
		<div>
			<div className="flex justify-end">
				<DownloadButton artifactName={artifactName} {...data} />
			</div>
			<div>
				{data.type === "image" && <ImageVisualization content={data.value} />}
				{data.type === "html" && <HTMLVisualization content={data.value} />}
				{data.type === "markdown" && <MarkdownVisualization content={data.value} />}
				{data.type === "csv" && <CSVVisualization content={data.value} />}
			</div>
		</div>
	);
}

function ConfirmDisplay({
	artifactName,
	setConfirmed,
	...rest
}: ArtifactVisualization & {
	artifactName: string;
	setConfirmed: Dispatch<SetStateAction<boolean>>;
}) {
	return (
		<div className="flex flex-col items-center justify-center gap-8">
			<InfoBox>
				This preview may contain harmful code. Only proceed if you trust the source. Loading content
				from untrusted sources can pose risks. If unsure, avoid loading.
			</InfoBox>
			<div className="flex justify-center gap-4">
				<Button size="md" onClick={() => setConfirmed(true)}>
					Load Preview
				</Button>
				<DownloadButton {...rest} buttonIntent="secondary" artifactName={artifactName} />
			</div>
		</div>
	);
}

function DownloadButton({
	type,
	value,
	artifactName,
	buttonIntent = "primary"
}: ArtifactVisualization & { artifactName: string; buttonIntent?: ButtonProps["intent"] }) {
	const fileTypeMap = {
		image: "png",
		html: "html",
		markdown: "md",
		csv: "csv"
	} as const;

	const typeMap = {
		image: "image/png",
		html: "text/html",
		markdown: "text/markdown",
		csv: "text/csv"
	} as const;

	function prepareImagedownload() {
		const byteArray = atob(value);
		const byteNumbers = new Array(byteArray.length);
		for (let i = 0; i < byteArray.length; i++) {
			byteNumbers[i] = byteArray.charCodeAt(i);
		}
		const byteArrayUint8 = new Uint8Array(byteNumbers);
		return byteArrayUint8;
	}

	function handleDownload() {
		try {
			const blob = new Blob([type === "image" ? prepareImagedownload() : value], {
				type: typeMap[type]
			});
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${artifactName}.` + fileTypeMap[type];
			a.click();
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Button intent={buttonIntent} size="md" className="mb-4" onClick={handleDownload}>
			Download
		</Button>
	);
}
