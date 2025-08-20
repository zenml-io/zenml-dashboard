import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { LogViewerProvider, useLogViewerContext } from "@/components/logs/logviewer-context";
import { apiPaths, createApiPath } from "@/data/api";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useRunLogs } from "@/data/pipeline-runs/run-logs";
import { keepPreviousData } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { LogCombobox } from "./combobox";

export function LogTab() {
	const { runId } = useParams() as { runId: string };
	const { data, isError, isPending } = usePipelineRun({ runId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection;

	const sources =
		logs
			?.map((log) => log.body?.source)
			.filter((source): source is string => source != null && source != undefined) ?? [];

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This pipeline run has no logs"
				subtitle="It looks like there are no logs associated with this pipeline run"
			/>
		);

	return <LogTabContent sources={sources} runId={runId} />;
}

function LogTabContent({ sources, runId }: { sources: string[]; runId: string }) {
	const [selectedSource, setSelectedSource] = useState<string>(sources[0]);
	return (
		<section className="space-y-5">
			{sources.length > 1 && (
				<div className="flex items-center gap-2">
					<span className="text-theme-text-secondary">Logs source:</span>
					<LogCombobox
						sources={sources}
						selectedSource={selectedSource}
						setSelectedSource={setSelectedSource}
					/>
				</div>
			)}
			<LogViewerProvider>
				<LogDisplay selectedSource={selectedSource} runId={runId} />
			</LogViewerProvider>
		</section>
	);
}

type LogTabContentProps = {
	selectedSource: string;
	runId: string;
};
function LogDisplay({ selectedSource, runId }: LogTabContentProps) {
	const { logLevel, searchQuery, currentPage } = useLogViewerContext();
	const runLogs = useRunLogs(
		{
			runId,
			queries: { source: selectedSource, level: logLevel, search: searchQuery, page: currentPage }
		},
		{ placeholderData: keepPreviousData }
	);

	if (runLogs.isPending) return <LoadingLogs />;

	if (runLogs.isError) {
		return <ErrorFallback err={runLogs.error} />;
	}

	const downloadUrl =
		createApiPath(apiPaths.runs.logsDownload(runId)) + "?source=" + selectedSource;

	return (
		<div className="h-full w-full">
			<EnhancedLogsViewer
				downloadLink={downloadUrl}
				logPage={runLogs.data}
				isLoading={runLogs.isFetching && runLogs.isPlaceholderData}
			/>
		</div>
	);
}
