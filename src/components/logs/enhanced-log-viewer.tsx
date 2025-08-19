import Collapse from "@/assets/icons/collapse-text.svg?react";
import Expand from "@/assets/icons/expand-full.svg?react";
import { LogEntry as LogEntryType, LogPage } from "@/types/logs"; // Assuming types are in src/types/logs.ts
import { Button } from "@zenml-io/react-component-library/components/server";
import React, { useState } from "react";
import { EmptyStateLogs } from "./empty-state-logs";
import LogLine from "./log-line"; // Import the LogLine component
import { useLogViewerContext } from "./logviewer-context";
import { LogToolbar } from "./toolbar";
import { useLogSearch } from "./use-log-search";

interface EnhancedLogsViewerProps {
	logPage: LogPage;
	itemsPerPage?: number;
}

const DEFAULT_ITEMS_PER_PAGE = 100;

export function EnhancedLogsViewer({
	logPage,
	itemsPerPage = DEFAULT_ITEMS_PER_PAGE
}: EnhancedLogsViewerProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [textWrapEnabled, setTextWrapEnabled] = useState(true);
	const { searchQuery, setSearchQuery } = useLogViewerContext();
	const [caseSensitive] = useState(false);

	const logs = logPage.items;

	// Initialize search functionality on filtered logs
	const { currentMatchIndex, totalMatches, goToNextMatch, goToPreviousMatch, highlightText } =
		useLogSearch(logs, searchQuery, caseSensitive);

	// Use search + filtered logs for pagination
	const logsToDisplay = logs;

	// Reset to first page when search or filters change
	React.useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const totalPages = logPage.total_pages;
	const startIndex = (currentPage - 1) * itemsPerPage;

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	const handleFirstPage = () => {
		setCurrentPage(1);
	};

	const handleLastPage = () => {
		setCurrentPage(totalPages);
	};

	const handleDownloadLogs = () => {
		const logText = getOriginalLogText(logsToDisplay);
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
	if (logs.length === 0) {
		return (
			<div className="flex h-full flex-col space-y-5">
				<LogToolbar
					onSearchChange={setSearchQuery}
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
				onSearchChange={setSearchQuery}
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
								title={textWrapEnabled ? "Collapse text" : "Expand text"}
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
							{logsToDisplay.map((entry, index) => {
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
								<span className="text-sm text-theme-text-secondary">
									Page {currentPage} of {totalPages}
								</span>
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

function getOriginalLogText(logs: LogEntryType[]) {
	return logs.map((log) => log.message).join("\n");
}
