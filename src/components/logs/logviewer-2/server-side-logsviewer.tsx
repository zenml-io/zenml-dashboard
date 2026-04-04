import { DebouncedInput } from "@/components/debounced-input";
import { ErrorFallback } from "@/components/Error";
import { useLogSearch } from "@/components/logs/use-log-search";
import { logQueries } from "@/data/logs";
import { buildInternalLogEntries, LOG_LEVELS } from "@/lib/logs";
import {
	LogEntriesQueryParams,
	LogEntriesResponse,
	LoggingLevel,
	LogSourceOption
} from "@/types/logs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { VirtuosoLogsViewer } from ".";
import { LoadingLogs } from "../loading-logs";
import { LogLevelSelect } from "../log-level-select";
import { LogSourceCombobox } from "../log-source-combobox";
import { LogViewerToolbar } from "./log-viewer-toolbar";
import { RefreshLogsButton, SearchNavigationButtons } from "./shared-logs-viewer";
import { useVirtuosoPrependAnchor } from "./use-virtuoso-prepend-anchor";

type ServerSideLogsViewerProps = {
	selectedSource: LogSourceOption;
	sources: LogSourceOption[];
	setSelectedSourceId: (sourceId: string) => void;
};

export function ServerSideLogsViewer({
	selectedSource,
	sources,
	setSelectedSourceId
}: ServerSideLogsViewerProps) {
	const [selectedLogLevel, setSelectedLogLevel] = useState<LoggingLevel>(LOG_LEVELS.INFO);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);

	const queries: LogEntriesQueryParams = {
		level: selectedLogLevel.toString(),
		search: searchQuery
	};

	const stepLogs = useInfiniteQuery({
		...logQueries.logEntriesInfinite({
			logsId: selectedSource.value,
			queries
		})
	});

	const { firstItemIndex, loadOlderItems } = useVirtuosoPrependAnchor<LogEntriesResponse>({
		pages: stepLogs.data?.pages,
		hasPreviousPage: stepLogs.hasPreviousPage,
		isFetchingPreviousPage: stepLogs.isFetchingPreviousPage,
		fetchPreviousPage: () => stepLogs.fetchPreviousPage(),
		getPageItemCount: (page) => page.items?.length ?? 0
	});

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data.pages.flatMap((page) => page.items ?? []));
	}, [stepLogs.data]);

	const normalizedSearchQuery = searchQuery?.trim() ?? "";

	const {
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		matchesByLogIndex,
		activeMatchLogIndex,
		activeMatchWithinLog
	} = useLogSearch(parsedLogs, normalizedSearchQuery);

	return (
		<div className="flex flex-1 flex-col space-y-5">
			<LogToolbar
				sources={sources}
				selectedSourceId={selectedSource.value}
				setSelectedSourceId={setSelectedSourceId}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				selectedLogLevel={selectedLogLevel}
				setSelectedLogLevel={setSelectedLogLevel}
				queries={queries}
				totalMatches={totalMatches}
				onPreviousMatch={goToPreviousMatch}
				onNextMatch={goToNextMatch}
			/>
			{stepLogs.isPending && <LoadingLogs />}
			{stepLogs.isError && <ErrorFallback err={stepLogs.error} />}
			{stepLogs.isSuccess && (
				<VirtuosoLogsViewer
					firstItemIndex={firstItemIndex}
					isLoadingPrevious={stepLogs.isFetchingPreviousPage}
					loadOlderLogs={loadOlderItems}
					logs={parsedLogs}
					searchQuery={normalizedSearchQuery}
					currentMatchIndex={currentMatchIndex}
					totalMatches={totalMatches}
					matchesByLogIndex={matchesByLogIndex}
					activeMatchLogIndex={activeMatchLogIndex}
					activeMatchWithinLog={activeMatchWithinLog}
				/>
			)}
		</div>
	);
}

type LogToolbarProps = {
	sources: LogSourceOption[];
	selectedSourceId: string;
	setSelectedSourceId: (sourceId: string) => void;
	searchQuery: string | null;
	setSearchQuery: (query: string | null) => void;
	selectedLogLevel: LoggingLevel;
	setSelectedLogLevel: (level: LoggingLevel) => void;
	queries: LogEntriesQueryParams;
	totalMatches: number;
	onPreviousMatch: () => void;
	onNextMatch: () => void;
};

function LogToolbar({
	sources,
	selectedSourceId,
	searchQuery,
	setSearchQuery,
	selectedLogLevel,
	setSelectedLogLevel,
	queries,
	setSelectedSourceId,
	totalMatches,
	onPreviousMatch,
	onNextMatch
}: LogToolbarProps) {
	const hasSearchQuery = (searchQuery ?? "").trim().length > 0;

	return (
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
								setSearchQuery(value.trim().length > 0 ? value : null);
							}}
							placeholder="Search logs..."
						/>
					</LogViewerToolbar.Search>
					{hasSearchQuery && (
						<SearchNavigationButtons
							totalMatches={totalMatches}
							onPreviousMatch={onPreviousMatch}
							onNextMatch={onNextMatch}
						/>
					)}
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
	);
}
