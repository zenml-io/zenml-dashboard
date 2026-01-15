import Collapse from "@/assets/icons/collapse-text.svg?react";
import Expand from "@/assets/icons/expand-full.svg?react";
import { LogEntryInternal } from "@/types/logs"; // Assuming types are in src/types/logs.ts
import { useVirtualizer } from "@tanstack/react-virtual";
import { Button } from "@zenml-io/react-component-library/components/server";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import LogLine from "./log-line"; // Import the LogLine component
import { LogToolbar } from "./toolbar";
import { useLogSearch } from "./use-log-search";
import { useLogLevelFilter } from "./use-loglevel-filter";

interface EnhancedLogsViewerProps {
	logs: LogEntryInternal[];
	reloadLogs: () => void;
	fallbackMessage: ReactNode;
	sourceSwitcher?: ReactNode;
}

export function EnhancedLogsViewer({
	logs,
	reloadLogs,
	fallbackMessage,
	sourceSwitcher
}: EnhancedLogsViewerProps) {
	const [textWrapEnabled, setTextWrapEnabled] = useState(true);
	const parentRef = useRef<HTMLDivElement>(null);
	const didInitialScrollRef = useRef(false);

	const { filteredLogs, setSelectedLogLevel, selectedLogLevel } = useLogLevelFilter(logs);

	// Search functionality on filtered logs
	const {
		searchQuery,
		setSearchQuery,
		matches,
		currentMatchIndex,
		totalMatches,
		goToNextMatch,
		goToPreviousMatch,
		matchesByLogIndex,
		activeMatchLogIndex,
		activeMatchWithinLog
	} = useLogSearch(filteredLogs);

	// Set up virtualizer with dynamic height measurement
	const virtualizer = useVirtualizer({
		overscan: 20,
		count: filteredLogs.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 32 // estimated single-line height
	});

	const virtualItems = virtualizer.getVirtualItems();
	const hasLogs = logs.length > 0;

	// Remeasure all items when text wrap changes
	useEffect(() => {
		virtualizer.measure();
	}, [textWrapEnabled, virtualizer]);

	// Scroll to bottom only on initial render (once logs are available)
	useEffect(() => {
		if (didInitialScrollRef.current || filteredLogs.length === 0) return;
		didInitialScrollRef.current = true;
		requestAnimationFrame(() => {
			virtualizer.scrollToIndex(filteredLogs.length - 1, { align: "end" });
		});
	}, [filteredLogs.length, virtualizer]);

	// After search produces results, scroll to the first match
	useEffect(() => {
		if (matches.length > 0 && matches[0]) {
			requestAnimationFrame(() => {
				virtualizer.scrollToIndex(matches[0].logIndex, { align: "center" });
			});
		}
	}, [matches, virtualizer]);

	// Wrappers that scroll to the new match after navigation
	const handleNextMatch = useCallback(() => {
		const nextIdx = goToNextMatch();
		if (nextIdx >= 0 && matches[nextIdx]) {
			requestAnimationFrame(() => {
				virtualizer.scrollToIndex(matches[nextIdx].logIndex, { align: "center" });
			});
		}
	}, [goToNextMatch, matches, virtualizer]);

	const handlePreviousMatch = useCallback(() => {
		const prevIdx = goToPreviousMatch();
		if (prevIdx >= 0 && matches[prevIdx]) {
			requestAnimationFrame(() => {
				virtualizer.scrollToIndex(matches[prevIdx].logIndex, { align: "center" });
			});
		}
	}, [goToPreviousMatch, matches, virtualizer]);

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

	if (!hasLogs) {
		return (
			<div className="flex flex-1 flex-col space-y-5">
				<LogToolbar
					hasLogs={false}
					sourceSwitcher={sourceSwitcher}
					logLevel={selectedLogLevel}
					setLogLevel={setSelectedLogLevel}
					onSearchChange={setSearchQuery}
					onReload={reloadLogs}
					onCopyAll={handleCopyAllLogs}
					onDownload={handleDownloadLogs}
					searchQuery={searchQuery}
					currentMatchIndex={currentMatchIndex}
					totalMatches={totalMatches}
					onPreviousMatch={handlePreviousMatch}
					onNextMatch={handleNextMatch}
				/>
				<div className="flex-1">{fallbackMessage}</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col space-y-5">
			<LogToolbar
				hasLogs
				sourceSwitcher={sourceSwitcher}
				logLevel={selectedLogLevel}
				setLogLevel={setSelectedLogLevel}
				onSearchChange={setSearchQuery}
				onReload={reloadLogs}
				onCopyAll={handleCopyAllLogs}
				onDownload={handleDownloadLogs}
				searchQuery={searchQuery}
				currentMatchIndex={currentMatchIndex}
				totalMatches={totalMatches}
				onPreviousMatch={handlePreviousMatch}
				onNextMatch={handleNextMatch}
			/>

			<div className="flex flex-1 flex-col overflow-hidden">
				{/* Fixed header */}
				<div className="flex w-full min-w-[600px] space-x-3 bg-theme-surface-tertiary px-4 py-1 font-medium text-theme-text-secondary">
					<div className="flex w-12 flex-shrink-0 items-center">
						<span className="text-text-sm font-semibold">Type</span>
					</div>
					<div className="w-[178px] flex-shrink-0">
						<span className="text-text-sm font-semibold">Time</span>
					</div>
					<div className="flex min-w-0 flex-1 items-center justify-between">
						<span className="text-text-sm font-semibold">Event</span>
					</div>
					<div className="flex flex-shrink-0 items-center">
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

				{/* Virtualized scrollable content */}
				<div ref={parentRef} className="flex-1 overflow-auto contain-strict">
					<div
						style={{
							height: virtualizer.getTotalSize(),
							width: "100%",
							position: "relative"
						}}
					>
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "fit-content",
								minWidth: "100%",
								transform: `translateY(${virtualItems[0]?.start ?? 0}px)`
							}}
						>
							{virtualItems.map((virtualRow) => {
								const logIndex = virtualRow.index;
								const entry = filteredLogs[logIndex];
								const matchRanges = matchesByLogIndex.get(logIndex);
								// Only pass activeMatchIndex if this log contains the active match
								const activeMatchIndex =
									logIndex === activeMatchLogIndex ? activeMatchWithinLog : -1;

								return (
									<div key={virtualRow.key} data-index={logIndex} ref={virtualizer.measureElement}>
										<LogLine
											entry={entry}
											textWrapEnabled={textWrapEnabled}
											matchRanges={matchRanges}
											activeMatchIndex={activeMatchIndex}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function getOriginalLogText(logs: LogEntryInternal[]) {
	return logs.map((log) => log.originalEntry).join("\n");
}
