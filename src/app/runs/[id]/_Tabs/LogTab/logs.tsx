import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { useRunLogs } from "@/data/pipeline-runs/run-logs";
import { parseLogString } from "@/lib/logs";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

export function LogTab() {
	const { runId } = useParams() as {
		runId: string;
	};

	const runLogs = useRunLogs({ runId });

	// Parse the log string into LogEntry objects for our enhanced viewer
	const parsedLogs = useMemo(() => {
		if (!runLogs.data) return [];
		return parseLogString(runLogs.data);
	}, [runLogs.data]);

	if (runLogs.isPending) return <LoadingLogs />;

	if (runLogs.isError) {
		return <ErrorFallback err={runLogs.error} />;
	}

	const logs = runLogs.data;

	if (!logs) {
		return (
			<EmptyStateLogs
				title="This pipeline run has no logs"
				subtitle="It looks like there are no logs associated with this pipeline run"
			/>
		);
	}

	return (
		<div className="h-full w-full">
			<EnhancedLogsViewer logs={parsedLogs} />
		</div>
	);
}
