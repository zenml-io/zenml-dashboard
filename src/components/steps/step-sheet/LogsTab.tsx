import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { EnhancedLogsViewer } from "@/components/logs/enhanced-log-viewer";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { ALL_SOURCES, LogSourceCombobox } from "@/components/logs/log-source-combobox";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { useStepLogs, useStepLogsForSources } from "@/data/steps/step-logs-query";
import { buildInternalLogEntries, buildMergedInternalLogEntries } from "@/lib/logs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isError, isPending } = useStepDetail({ stepId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection;

	const sources = Array.from(
		new Set(
			logs
				?.map((log) => log.body?.source)
				.filter((source): source is string => source != null && source !== undefined) ?? []
		)
	);

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);

	return <StepLogsTabContent sources={sources} stepId={stepId} />;
}

function StepLogsTabContent({ sources, stepId }: { sources: string[]; stepId: string }) {
	const defaultSource = sources.includes("step") ? "step" : sources[0];
	const [selectedSource, setSelectedSource] = useState<string>(defaultSource);

	const isAllSources = selectedSource === ALL_SOURCES;

	// Single-source fetch (used when a specific source is selected)
	const stepLogs = useStepLogs(
		{ stepId, queries: { source: selectedSource } },
		{ enabled: !isAllSources }
	);

	// Multi-source fan-out fetch (used when "All Sources" is selected)
	const multiLogs = useStepLogsForSources({
		stepId,
		sources,
		enabled: isAllSources
	});

	const parsedLogs = useMemo(() => {
		if (isAllSources) {
			return buildMergedInternalLogEntries(
				Object.entries(multiLogs.dataBySource).map(([source, entries]) => ({
					source,
					entries
				}))
			);
		}
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data, { source: selectedSource });
	}, [isAllSources, multiLogs.dataBySource, stepLogs.data, selectedSource]);

	const isPending = isAllSources ? multiLogs.isPending : stepLogs.isPending;
	const isError = isAllSources ? multiLogs.isError : stepLogs.isError;
	const error = isAllSources ? null : stepLogs.error;

	if (isPending) return <LoadingLogs />;

	if (isError) {
		return error ? <ErrorFallback err={error} /> : <p>Error loading logs</p>;
	}

	return (
		<EnhancedLogsViewer
			fallbackMessage={
				<EmptyStateLogs
					title="This step has no logs"
					subtitle="It looks like there are no logs associated with this step"
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
			showSourceColumns={isAllSources}
			logs={parsedLogs}
			reloadLogs={() => {
				if (isAllSources) {
					multiLogs.refetchAll();
				} else {
					stepLogs.refetch();
				}
			}}
		/>
	);
}
