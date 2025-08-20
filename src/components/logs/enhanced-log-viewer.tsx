import { LogPage } from "@/types/logs"; // Assuming types are in src/types/logs.ts
import React, { useState } from "react";
import { EmptyStateLogs } from "./empty-state-logs";
import { FilterLogsIndicator } from "./loading-logs";
import { LogsContent } from "./logs-content";
import { useLogViewerContext } from "./logviewer-context";
import { LogToolbar } from "./toolbar";
import { useLogSearch } from "./use-log-search";

interface EnhancedLogsViewerProps {
	logPage: LogPage;
	itemsPerPage?: number;
	downloadLink?: string;
	isLoading: boolean;
}

export function EnhancedLogsViewer({ logPage, downloadLink, isLoading }: EnhancedLogsViewerProps) {
	const { currentPage, setCurrentPage } = useLogViewerContext();
	const [textWrapEnabled, setTextWrapEnabled] = useState(true);
	const { searchQuery, setSearchQuery } = useLogViewerContext();
	const [caseSensitive] = useState(false);

	const logs = logPage.items;

	const itemsPerPage = logPage.max_size;

	// Calculate start index for proper log indexing across pages
	const startIndex = (currentPage - 1) * itemsPerPage;

	// Initialize search functionality on filtered logs
	const { currentMatchIndex, totalMatches, goToNextMatch, goToPreviousMatch, highlightText } =
		useLogSearch(logs, searchQuery, caseSensitive);

	// Reset to first page when search or filters change
	React.useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	const handleToggleTextWrap = () => {
		setTextWrapEnabled((prev) => !prev);
	};

	return (
		<div className="flex h-full flex-col space-y-5">
			<LogToolbar
				isLoading={isLoading}
				downloadLink={downloadLink}
				onSearchChange={setSearchQuery}
				searchQuery={searchQuery}
				currentMatchIndex={currentMatchIndex}
				totalMatches={totalMatches}
				onPreviousMatch={goToPreviousMatch}
				onNextMatch={goToNextMatch}
			/>
			<LogsViewerBody
				isLoading={isLoading}
				logs={logs}
				logPage={logPage}
				searchQuery={searchQuery}
				textWrapEnabled={textWrapEnabled}
				highlightText={highlightText}
				startIndex={startIndex}
				handleToggleTextWrap={handleToggleTextWrap}
			/>
		</div>
	);
}

type LogsViewerBodyProps = {
	isLoading: boolean;
	logs: any[];
	logPage: LogPage;
	searchQuery: string;
	textWrapEnabled: boolean;
	highlightText: (text: string, logIndex: number) => React.ReactNode;
	startIndex: number;
	handleToggleTextWrap: () => void;
};

function LogsViewerBody({
	isLoading,
	logs,
	logPage,
	searchQuery,
	textWrapEnabled,
	highlightText,
	startIndex,
	handleToggleTextWrap
}: LogsViewerBodyProps) {
	if (isLoading) {
		return <FilterLogsIndicator />;
	}

	if (logs.length === 0) {
		return (
			<div className="flex-1 overflow-hidden">
				<EmptyStateLogs title="No logs found" subtitle="No logs available to display." />
			</div>
		);
	}

	return (
		<LogsContent
			handleToggleTextWrap={handleToggleTextWrap}
			logPage={logPage}
			searchQuery={searchQuery}
			textWrapEnabled={textWrapEnabled}
			highlightText={highlightText}
			startIndex={startIndex}
		/>
	);
}
