import Copy from "@/assets/icons/copy.svg?react";
import Download from "@/assets/icons/download-01.svg?react";
import { DebouncedInput } from "@/components/debounced-input";
import { ErrorFallback } from "@/components/Error";
import { useLogSearch } from "@/components/logs/use-log-search";
import { logQueries } from "@/data/logs";
import { buildInternalLogEntries, LOG_LEVELS } from "@/lib/logs";
import { LogEntriesQueryParams, LoggingLevel, LogSourceOption } from "@/types/logs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { VirtuosoLogsViewer } from ".";
import { LoadingLogs } from "../loading-logs";
import { LogLevelSelect } from "../log-level-select";
import { LogSourceCombobox } from "../log-source-combobox";
import { LogViewerToolbar } from "./log-viewer-toolbar";
import {
	getOriginalLogText,
	RefreshLogsButton,
	SearchNavigationButtons
} from "./shared-logs-viewer";

type ClientSideLogsViewerProps = {
	selectedSource: LogSourceOption;
	sources: LogSourceOption[];
	setSelectedSourceId: (sourceId: string) => void;
};

export function ClientSideLogsViewer({
	selectedSource,
	sources,
	setSelectedSourceId
}: ClientSideLogsViewerProps) {
	const [selectedLogLevel, setSelectedLogLevel] = useState<LoggingLevel>(LOG_LEVELS.INFO);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const queries: LogEntriesQueryParams = {};
	const stepLogs = useInfiniteQuery({
		...logQueries.logEntriesInfinite({
			logsId: selectedSource.value,
			queries
		})
	});

	const parsedLogs = useMemo(() => {
		if (!stepLogs.data) return [];
		return buildInternalLogEntries(stepLogs.data.pages.flatMap((page) => page.items ?? []));
	}, [stepLogs.data]);

	const filteredLogs = useMemo(() => {
		return parsedLogs
			.filter((log) => log.level && log.level >= selectedLogLevel)
			.filter((log) => log.message.toLowerCase().includes(searchQuery.toLowerCase()));
	}, [parsedLogs, selectedLogLevel, searchQuery]);

	const normalizedSearchQuery = searchQuery.trim();

	const {
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		matchesByLogIndex,
		activeMatchLogIndex,
		activeMatchWithinLog
	} = useLogSearch(filteredLogs, normalizedSearchQuery);

	const handleDownloadLogs = useCallback(() => {
		const logText = getOriginalLogText(parsedLogs);
		const blob = new Blob([logText], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `logs-${new Date().toISOString().split("T")[0]}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, [parsedLogs]);

	const handleCopyLogs = useCallback(() => {
		const logText = getOriginalLogText(parsedLogs);
		navigator.clipboard.writeText(logText);
	}, [parsedLogs]);

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
				onCopyLogs={handleCopyLogs}
				onDownloadLogs={handleDownloadLogs}
				isLogsFetching={stepLogs.isFetching}
				hasLogs={parsedLogs.length > 0}
			/>
			{stepLogs.isPending && <LoadingLogs />}
			{stepLogs.isError && <ErrorFallback err={stepLogs.error} />}
			{stepLogs.isSuccess && (
				<VirtuosoLogsViewer
					firstItemIndex={0}
					isLoadingPrevious={false}
					loadOlderLogs={() => {}}
					logs={filteredLogs}
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
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedLogLevel: LoggingLevel;
	setSelectedLogLevel: (level: LoggingLevel) => void;
	queries: LogEntriesQueryParams;
	totalMatches: number;
	onPreviousMatch: () => void;
	onNextMatch: () => void;
	onCopyLogs: () => void;
	onDownloadLogs: () => void;
	isLogsFetching: boolean;
	hasLogs: boolean;
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
	onNextMatch,
	onCopyLogs,
	onDownloadLogs,
	isLogsFetching,
	hasLogs
}: LogToolbarProps) {
	const hasSearchQuery = searchQuery.trim().length > 0;

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
							value={searchQuery}
							onChange={(value) => {
								setSearchQuery(value);
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
						<ClientLogsButtons
							hasLogs={hasLogs}
							onCopyLogs={onCopyLogs}
							onDownloadLogs={onDownloadLogs}
							isLogsFetching={isLogsFetching}
						/>
						<RefreshLogsButton queries={queries} selectedSourceId={selectedSourceId} />
					</LogViewerToolbar.Actions>
				</LogViewerToolbar.Right>
			</LogViewerToolbar.Content>
		</LogViewerToolbar.Root>
	);
}
type ClientLogsButtonsProps = {
	hasLogs: boolean;
	onCopyLogs: () => void;
	onDownloadLogs: () => void;
	isLogsFetching: boolean;
};

function ClientLogsButtons({
	hasLogs,
	onCopyLogs,
	onDownloadLogs,
	isLogsFetching
}: ClientLogsButtonsProps) {
	return (
		<>
			<LogViewerToolbar.IconButton
				className="text-theme-text-primary"
				disabled={isLogsFetching || !hasLogs}
				tooltip="Copy logs"
				onClick={onCopyLogs}
			>
				<Copy className="h-4 w-4 fill-current" />
			</LogViewerToolbar.IconButton>
			<LogViewerToolbar.IconButton
				className="text-theme-text-primary"
				disabled={isLogsFetching || !hasLogs}
				tooltip="Download logs"
				onClick={onDownloadLogs}
			>
				<Download className="h-4 w-4 fill-current" />
			</LogViewerToolbar.IconButton>
		</>
	);
}
