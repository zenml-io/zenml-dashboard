import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { LogSourceCombobox } from "@/components/logs/log-source-combobox";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useRunLogs } from "@/data/pipeline-runs/run-logs";
import { buildInternalLogEntries } from "@/lib/logs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";

type Props = {
	runId: string;
};
export function LogTab({ runId }: Props) {
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

	return <LogDisplay sources={sources} runId={runId} />;
}

type LogTabContentProps = {
	sources: string[];
	runId: string;
};
function LogDisplay({ sources, runId }: LogTabContentProps) {
	const [selectedSource, setSelectedSource] = useState<string>(sources[0]);
	const runLogs = useRunLogs({ runId, queries: { source: selectedSource } });

	const parsedLogs = useMemo(() => {
		if (!runLogs.data) return [];
		return buildInternalLogEntries(runLogs.data);
	}, [runLogs.data]);

	if (runLogs.isPending) return <LoadingLogs />;

	if (runLogs.isError) {
		return <ErrorFallback err={runLogs.error} />;
	}

	return (
		<EnhancedLogsViewer
			fallbackMessage={
				<EmptyStateLogs
					title="This pipeline run has no logs"
					subtitle="It looks like there are no logs associated with this pipeline run"
				/>
			}
			sourceSwitcher={
				sources.length > 1 ? (
					<div className="space-y-0.5">
						<span className="text-text-sm text-theme-text-secondary">Source</span>
						<LogSourceCombobox
							sources={sources}
							selectedSource={selectedSource}
							setSelectedSource={setSelectedSource}
						/>
					</div>
				) : undefined
			}
			logs={parsedLogs}
			reloadLogs={() => runLogs.refetch()}
		/>
	);
}
