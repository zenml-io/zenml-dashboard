import BarChart from "@/assets/icons/bar-chart.svg?react";
import CodeSquare from "@/assets/icons/code-square.svg?react";
import Info from "@/assets/icons/info.svg?react";
import { SheetHeader } from "@/components/sheet/SheetHeader";
import { TabIcon } from "@/components/tab-icon";
import { ScrollingTabsList } from "@/components/tabs/scrolling-tabs-list";
import { VisualizationConfirmProvider } from "@/context/VisualizationConfirmationContext";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { Badge, Skeleton, Tabs, TabsContent, TabsTrigger } from "@zenml-io/react-component-library";
import { useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSheetContext } from "@/components/dag-visualizer/sheet-context";
import { ArtifactIcon } from "../../ArtifactIcon";
import { ArtifactDetailTab } from "./DetailsTab";
import { ArtifactMetadataTab } from "./MetadataTab";
import { VisualizationErrorFallback, VisualizationTab } from "./VisualizationTab";

type Props = {
	artifactVersionId: string;
};

export function ArtifactSheetContent({ artifactVersionId }: Props) {
	const { data } = useArtifactVersion({ versionId: artifactVersionId });

	const version = data?.body?.version;
	const { openArtifactSheet } = useSheetContext();
	const handleVersionBadgeClick = useCallback(() => {
		openArtifactSheet(artifactVersionId);
	}, [artifactVersionId, openArtifactSheet]);

	return (
		<div>
			{/* Header */}
			<SheetHeader />
			<div className="border-b border-theme-border-moderate bg-theme-surface-primary p-5">
				{data ? (
					<p className="mb-0.5 text-text-sm text-theme-text-secondary">{artifactVersionId}</p>
				) : (
					<Skeleton className="w-9" />
				)}
				{data ? (
					<div className="flex items-center gap-1">
						<ArtifactIcon
							artifactType={data.body?.type || "BaseArtifact"}
							className="h-5 w-5 fill-theme-surface-strong"
						/>
						<h2 className="text-display-xs font-semibold">{data.body?.artifact.name}</h2>

						<button
							type="button"
							onClick={handleVersionBadgeClick}
							className="m-0 inline-flex cursor-pointer items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-surface-primary"
							aria-label={`Open artifact version ${version ?? "None"} (${artifactVersionId})`}
							aria-haspopup="dialog"
							title={`Open artifact version ${version ?? "None"} (${artifactVersionId})`}
						>
							<Badge color={version ? "light-purple" : "light-grey"} rounded={false}>
								{version || "None"}
							</Badge>
						</button>
					</div>
				) : (
					<Skeleton className="h-6 w-7" />
				)}
			</div>
			<div className="p-5">
				<VisualizationConfirmProvider>
					<Tabs defaultValue="overview">
						<ScrollingTabsList>
							<TabsTrigger className="flex items-center gap-2 text-text-md" value="overview">
								<TabIcon icon={Info} />
								<span>Overview</span>
							</TabsTrigger>
							<TabsTrigger
								className="flex items-center gap-2 truncate text-text-md"
								value="metadata"
							>
								<TabIcon icon={CodeSquare} />
								<span>Metadata</span>
							</TabsTrigger>
							<TabsTrigger className="flex items-center gap-2 text-text-md" value="visualization">
								<TabIcon icon={BarChart} />
								<span>Visualization</span>
							</TabsTrigger>
						</ScrollingTabsList>

						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="overview">
							<ArtifactDetailTab artifactVersionId={artifactVersionId} />
						</TabsContent>
						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="metadata">
							<ArtifactMetadataTab artifactVersionId={artifactVersionId} />
						</TabsContent>
						<TabsContent className="m-0 mt-5 border-0 bg-transparent p-0" value="visualization">
							<ErrorBoundary FallbackComponent={VisualizationErrorFallback}>
								<VisualizationTab artifactVersionId={artifactVersionId} />
							</ErrorBoundary>
						</TabsContent>
					</Tabs>
				</VisualizationConfirmProvider>
			</div>
		</div>
	);
}
