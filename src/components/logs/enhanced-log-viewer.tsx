import Collapse from "@/assets/icons/collapse-text.svg?react";
import Expand from "@/assets/icons/expand-full.svg?react";
import { LogEntryInternal } from "@/types/logs"; // Assuming types are in src/types/logs.ts
import { Button, Input } from "@zenml-io/react-component-library/components/server";
import React, { useCallback, useState } from "react";
import { EmptyStateLogs } from "./empty-state-logs";
import LogLine from "./log-line"; // Import the LogLine component
import { LogToolbar } from "./toolbar";
import { useLogSearch } from "./use-log-search";
import { useLogLevelFilter } from "./use-loglevel-filter";
import { useLogPageInput } from "./use-logpage-input";

interface EnhancedLogsViewerProps {
	logs: LogEntryInternal[];
	reloadLogs: () => void;
	itemsPerPage?: number; // Optional prop for items per page
}

const DEFAULT_ITEMS_PER_PAGE = 100;

export function EnhancedLogsViewer({
	logs,
	reloadLogs,
	itemsPerPage = DEFAULT_ITEMS_PER_PAGE
}: EnhancedLogsViewerProps) {
	const [currentPage, setCurrentPageState] = useState(1);
	const [textWrapEnabled, setTextWrapEnabled] = useState(true);

	const {
		filteredLogs: filteredLogsByLogLevel,
		selectedLogLevel,
		setSelectedLogLevel
	} = useLogLevelFilter(logs);

	const {
		searchQuery,
		setSearchQuery,
		filteredLogs: searchAndFilteredLogs,
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		highlightText
	} = useLogSearch(filteredLogsByLogLevel);

	// Use search + filtered logs for pagination
	const logsToDisplay = searchAndFilteredLogs;

	// Reset to first page when search or filters change

	const totalPages = Math.ceil(logsToDisplay.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLogs = logsToDisplay.slice(startIndex, endIndex);

	const { form } = useLogPageInput(currentPage, totalPages);

	const setCurrentPage = useCallback(
		(page: number) => {
			setCurrentPageState(page);
			form.setValue("page", page);
		},
		[form]
	);

	function handlePageSubmit(data: { page: number }) {
		setCurrentPage(data.page);
	}

	React.useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const handlePreviousPage = () => {
		setCurrentPage(Math.max(currentPage - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage(Math.min(currentPage + 1, totalPages));
	};

	const handleFirstPage = () => {
		setCurrentPage(1);
	};

	const handleLastPage = () => {
		setCurrentPage(totalPages);
	};

	const handleReloadLogs = () => {
		reloadLogs();
	};

	const handleCopyAllLogs = () => {
		const logText = getOriginalLogText(logs);
		navigator.clipboard.writeText(logText).catch((err) => {
			console.error("Failed to copy logs:", err);
		});
	};

	const handleDownloadLogs = () => {
		const logText = getOriginalLogText(logs);
		const blob = new Blob([logText], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `logs-${new Date().toISOString().split("T")[0]}.txt`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const handleToggleTextWrap = () => {
		setTextWrapEnabled((prev) => !prev);
	};

	// Empty state - no logs at all
	if (!logs || searchAndFilteredLogs.length === 0) {
		return (
			<div className="flex h-full flex-col space-y-5">
				<LogToolbar
					logLevel={selectedLogLevel}
					setLogLevel={setSelectedLogLevel}
					onSearchChange={setSearchQuery}
					onReload={handleReloadLogs}
					onCopyAll={handleCopyAllLogs}
					onDownload={handleDownloadLogs}
					searchQuery={searchQuery}
					currentMatchIndex={currentMatchIndex}
					totalMatches={totalMatches}
					onPreviousMatch={goToPreviousMatch}
					onNextMatch={goToNextMatch}
				/>

				<div className="flex-1 overflow-hidden">
					<EmptyStateLogs title="No logs found" subtitle="No logs available to display." />
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col space-y-5">
			<LogToolbar
				logLevel={selectedLogLevel}
				setLogLevel={setSelectedLogLevel}
				onSearchChange={setSearchQuery}
				onReload={handleReloadLogs}
				onCopyAll={handleCopyAllLogs}
				onDownload={handleDownloadLogs}
				searchQuery={searchQuery}
				currentMatchIndex={currentMatchIndex}
				totalMatches={totalMatches}
				onPreviousMatch={goToPreviousMatch}
				onNextMatch={goToNextMatch}
			/>

			<div className="flex-1 overflow-hidden rounded-md border border-theme-border-moderate">
				{/* Fixed header - always same width */}
				<div className="sticky top-0 z-10 bg-theme-surface-tertiary">
					{/* Table-style header with fixed structure */}
					<div className="flex w-full min-w-[600px] space-x-3 bg-theme-surface-tertiary px-4 py-1 font-medium text-theme-text-secondary">
						{/* Type column header - match LogLine badge area */}
						<div className="flex w-12 flex-shrink-0 items-center">
							<span className="text-text-sm font-semibold">Type</span>
						</div>

						{/* Time column header - match LogLine timestamp width */}
						<div className="w-[178px] flex-shrink-0">
							<span className="text-text-sm font-semibold">Time</span>
						</div>

						{/* Event column header - flexible but consistent */}
						<div className="flex min-w-0 flex-1 items-center justify-between">
							<span className="text-text-sm font-semibold">Event</span>
						</div>
						<div className="flex flex-shrink-0 items-center">
							{" "}
							{/* Text wrap toggle button */}
							<Button
								onClick={handleToggleTextWrap}
								size="sm"
								emphasis="subtle"
								intent="secondary"
								className="ml-2 h-5 w-5 rounded-sm bg-theme-surface-primary p-0.25"
								title={textWrapEnabled ? "Unwrap text" : "Wrap text"}
							>
								{textWrapEnabled ? (
									<Collapse className="h-4 w-4 shrink-0 text-theme-text-tertiary hover:text-theme-text-secondary" />
								) : (
									<Expand className="h-4 w-4 shrink-0 fill-theme-text-tertiary hover:fill-theme-text-secondary" />
								)}
							</Button>
						</div>
					</div>
				</div>

				{/* Scrollable content - behavior changes based on text wrap */}
				<div className="flex-1 overflow-x-auto overflow-y-auto">
					<div className={textWrapEnabled ? "min-w-full" : "flex w-full min-w-full"}>
						{/* Logs content */}
						<div className="flex-1 bg-theme-surface-primary">
							{currentLogs.map((entry, index) => {
								// Calculate the actual log index in the filtered logs array
								const actualLogIndex = startIndex + index;

								return (
									<LogLine
										key={entry.id}
										entry={entry}
										searchTerm={searchQuery}
										textWrapEnabled={textWrapEnabled}
										highlightedMessage={highlightText(entry.message, actualLogIndex)}
									/>
								);
							})}
						</div>
					</div>
				</div>

				{/* Pagination - only show when there are multiple pages */}
				{totalPages > 1 && (
					<div className="border-t border-theme-border-minimal bg-theme-surface-secondary px-4 py-3">
						<div className="flex items-center justify-between">
							<div className="text-sm text-theme-text-secondary">
								Showing {startIndex + 1} to{" "}
								{Math.min(startIndex + itemsPerPage, logsToDisplay.length)} of{" "}
								{logsToDisplay.length} logs
							</div>
							<div className="flex items-center space-x-2">
								<Button
									className="bg-theme-surface-primary"
									size="md"
									intent="secondary"
									emphasis="subtle"
									onClick={handleFirstPage}
									disabled={currentPage === 1}
								>
									First
								</Button>
								<Button
									className="bg-theme-surface-primary"
									size="md"
									intent="secondary"
									emphasis="subtle"
									onClick={handlePreviousPage}
									disabled={currentPage === 1}
								>
									Previous
								</Button>
								<form
									onSubmit={form.handleSubmit(handlePageSubmit)}
									className="text-sm flex items-center gap-1 text-theme-text-secondary"
								>
									Page
									<Input {...form.register("page")} className="w-10" />
									of {totalPages}
								</form>
								<Button
									className="bg-theme-surface-primary"
									size="md"
									intent="secondary"
									emphasis="subtle"
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
								>
									Next
								</Button>
								<Button
									className="bg-theme-surface-primary"
									size="md"
									intent="secondary"
									emphasis="subtle"
									onClick={handleLastPage}
									disabled={currentPage === totalPages}
								>
									Last
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function getOriginalLogText(logs: LogEntryInternal[]) {
	return logs.map((log) => log.originalEntry).join("\n");
}
