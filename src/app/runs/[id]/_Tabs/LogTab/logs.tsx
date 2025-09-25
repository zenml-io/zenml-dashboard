import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useRunLogs } from "@/data/pipeline-runs/run-logs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { LogCombobox } from "./combobox";
import { buildInternalLogEntries } from "@/lib/logs";

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
			{sources.length > 0 && (
				<div className="flex items-center gap-2">
					<span className="text-theme-text-secondary">Logs source:</span>
					{sources.length > 1 ? (
						<LogCombobox
							sources={sources}
							selectedSource={selectedSource}
							setSelectedSource={setSelectedSource}
						/>
					) : (
						<span className="font-semibold capitalize">{selectedSource}</span>
					)}
				</div>
			)}
			<LogDisplay selectedSource={selectedSource} runId={runId} />
		</section>
	);
}

type LogTabContentProps = {
	selectedSource: string;
	runId: string;
};
function LogDisplay({ selectedSource, runId }: LogTabContentProps) {
	const runLogs = useRunLogs({ runId, queries: { source: selectedSource } });

	const parsedLogs = useMemo(() => {
		if (!runLogs.data) return [];
		return buildInternalLogEntries(runLogs.data);
	}, [runLogs.data]);

	if (runLogs.isPending) return <LoadingLogs />;

	if (runLogs.isError) {
		return <ErrorFallback err={runLogs.error} />;
	}

	const logs = runLogs.data;
	if (logs.length === 0) {
		return (
			<EmptyStateLogs
				title="This pipeline run has no logs"
				subtitle="It looks like there are no logs associated with this pipeline run"
			/>
		);
	}

	return (
		<div className="h-full w-full">
			<EnhancedLogsViewer logs={parsedLogs} reloadLogs={() => runLogs.refetch()} />
		</div>
	);
}
