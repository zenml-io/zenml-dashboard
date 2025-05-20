import DownloadIcon from "@/assets/icons/download-01.svg?react";
import { Button } from "@zenml-io/react-component-library/components/server";
import { useArtifactVisualization } from "@/data/artifact-versions/artifact-visualization-query";
import { ArtifactVisualizationQueryParams } from "@/types/artifact-versions";

type Props = {
	artifactName: string;
	artifactVersionId: string;
	visualizationIndex: number;
};

const fileTypeMap = {
	image: "png",
	html: "html",
	markdown: "md",
	csv: "csv",
	json: "json"
} as const;

const typeMap = {
	image: "image/png",
	html: "text/html",
	markdown: "text/markdown",
	csv: "text/csv",
	json: "application/json"
} as const;

export function DownloadButton({ artifactVersionId, visualizationIndex, artifactName }: Props) {
	const params: ArtifactVisualizationQueryParams = {
		index: visualizationIndex
	};
	const { data, isSuccess } = useArtifactVisualization(
		{ versionId: artifactVersionId, params },
		{
			retry: false
		}
	);

	if (!isSuccess) return null;

	const { type, value } = data;

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
			a.download = `${artifactName}_${visualizationIndex}.` + fileTypeMap[type];
			a.click();
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<Button
			intent="secondary"
			emphasis="subtle"
			size="md"
			className="flex items-center gap-1 bg-theme-surface-primary"
			onClick={handleDownload}
		>
			<DownloadIcon width={24} height={24} className="shrink-0 fill-theme-text-primary" />
			Download
		</Button>
	);
}
