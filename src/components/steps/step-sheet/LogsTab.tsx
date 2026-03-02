import Refresh from "@/assets/icons/refresh.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { ErrorFallback } from "@/components/Error";
import { EmptyStateLogs } from "@/components/logs/empty-state-logs";
import { LoadingLogs } from "@/components/logs/loading-logs";
import { LogLevelSelect } from "@/components/logs/log-level-select";
import { LogSourceCombobox, LogSourceOption } from "@/components/logs/log-source-combobox";
import { LogViewer2Virtuoso } from "@/components/logs/logviewer-2";
import { LogViewerToolbar } from "@/components/logs/logviewer-2/log-viewer-toolbar";
import { logQueries } from "@/data/logs";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { buildInternalLogEntries, LOG_LEVELS } from "@/lib/logs";
import { LogEntriesQueryParams, LoggingLevel } from "@/types/logs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { useMemo, useState } from "react";

type Props = {
	stepId: string;
};

export function StepLogsTab({ stepId }: Props) {
	const { data, isError, isPending } = useStepDetail({ stepId });

	if (isPending) return <Skeleton className="h-[200px] w-full" />;
	if (isError) return <p>Error loading logs</p>;

	const logs = data.resources?.log_collection ?? [];

	const sources: LogSourceOption[] = logs.map((log) => {
		return {
			value: log.id,
			label: log.body?.source ?? log.id
		};
	});

	if (sources.length < 1)
		return (
			<EmptyStateLogs
				title="This step has no logs"
				subtitle="It looks like there are no logs associated with this step"
			/>
		);

	return <StepLogsTabContent sources={sources} />;
}

function StepLogsTabContent({ sources }: { sources: LogSourceOption[] }) {
	const [selectedSourceId, setSelectedSourceId] = useState<string>(sources[0].value);
	const [selectedLogLevel, setSelectedLogLevel] = useState<LoggingLevel>(LOG_LEVELS.INFO);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);

	const queries: LogEntriesQueryParams = {
		level: selectedLogLevel.toString(),
		search: searchQuery
	};

	return (
		<div className="flex flex-1 flex-col space-y-5">
			<LogViewerToolbar.Root>
				<LogViewerToolbar.SourceSwitcher>
					<LogSourceCombobox
						options={sources}
						selectedValue={selectedSourceId}
						onValueChange={setSelectedSourceId}
					/>
				</LogViewerToolbar.SourceSwitcher>

				<LogViewerToolbar.Content>
					<LogViewerToolbar.Left>
						<LogViewerToolbar.Search
							onSubmit={(event) => {
								event.preventDefault();
							}}
						>
							<DebouncedInput
								debounceMs={1000}
								className="border-neutral-300"
								value={searchQuery ?? ""}
								onChange={(value) => {
									if (value === "") setSearchQuery(null);
									setSearchQuery(value);
								}}
								placeholder="Search logs..."
							/>
						</LogViewerToolbar.Search>
						<LogViewerToolbar.Filters>
							<LogLevelSelect
								value={selectedLogLevel.toString()}
								onValueChange={(value) => setSelectedLogLevel(Number(value) as LoggingLevel)}
							/>
						</LogViewerToolbar.Filters>
					</LogViewerToolbar.Left>
					<LogViewerToolbar.Right>
						<LogViewerToolbar.Actions>
							<RefreshLogsButton queries={queries} selectedSourceId={selectedSourceId} />
						</LogViewerToolbar.Actions>
					</LogViewerToolbar.Right>
				</LogViewerToolbar.Content>
			</LogViewerToolbar.Root>
			<LogRenderer selectedSourceId={selectedSourceId} queries={queries} />
		</div>
	);
}

type LogProps = {
	queries: LogEntriesQueryParams;
	selectedSourceId: string;
};

function LogRenderer({ queries, selectedSourceId }: LogProps) {
	const stepLogs = useInfiniteQuery({
		...logQueries.logEntriesInfinite({
			logsId: selectedSourceId,
			queries: queries
		})
	});

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data.pages.flatMap((page) => page.items ?? []));
	}, [stepLogs.data]);

	if (stepLogs.isPending) return <LoadingLogs />;

	if (stepLogs.isError) {
		return <ErrorFallback err={stepLogs.error} />;
	}

	return <LogViewer2Virtuoso logs={parsedLogs} />;
}

function RefreshLogsButton({ queries, selectedSourceId }: LogProps) {
	const stepLogs = useInfiniteQuery({
		...logQueries.logEntriesInfinite({
			logsId: selectedSourceId,
			queries: queries
		})
	});

	return (
		<LogViewerToolbar.IconButton
			className="text-theme-text-primary"
			disabled={stepLogs.isFetching}
			tooltip="Reload logs"
			onClick={() => stepLogs.refetch()}
		>
			<Refresh className="h-4 w-4 fill-current" />
		</LogViewerToolbar.IconButton>
	);
}
