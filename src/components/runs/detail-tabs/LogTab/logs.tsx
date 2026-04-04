import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { ClientSideLogsViewer } from "@/components/logs/logviewer-2/client-side-logs-viewer";
import { ServerSideLogsViewer } from "@/components/logs/logviewer-2/server-side-logsviewer";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { LogSourceOption } from "@/types/logs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useState } from "react";

type Props = {
	runId: string;
};
export function LogTab({ runId }: Props) {
	const { data, isError, isPending } = usePipelineRun({ runId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection ?? [];

	const sources: LogSourceOption[] = logs.map((log) => {
		return {
			value: log.id,
			label: log.body?.source ?? log.id,
			hasLogStore: !!log.body?.log_store_id
		};
	});

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This pipeline run has no logs"
				subtitle="It looks like there are no logs associated with this pipeline run"
			/>
		);

	return <LogDisplay sources={sources} />;
}

type LogTabContentProps = {
	sources: LogSourceOption[];
};
function LogDisplay({ sources }: LogTabContentProps) {
	const [selectedSourceId, setSelectedSourceId] = useState<string>(sources[0].value);

	const selectedSource = sources.find((source) => source.value === selectedSourceId);

	if (!selectedSource) return null;

	if (selectedSource.hasLogStore)
		return (
			<ServerSideLogsViewer
				selectedSource={selectedSource}
				sources={sources}
				setSelectedSourceId={setSelectedSourceId}
			/>
		);

	return (
		<ClientSideLogsViewer
			selectedSource={selectedSource}
			sources={sources}
			setSelectedSourceId={setSelectedSourceId}
		/>
	);
}
