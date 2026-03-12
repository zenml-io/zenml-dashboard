import type { MatchRange } from "@/components/logs/use-log-search";
import { LogEntryInternal } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { useEffect, useMemo, useRef } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";
import { LogLine } from "./log-line";
import { EmptyStateLogs } from "../empty-state-logs";
import { Spinner } from "@zenml-io/react-component-library/components/server";

type VirtuosoLogsViewerProps = {
	logs: LogEntryInternal[];
	firstItemIndex: number;
	loadOlderLogs: () => void;
	isLoadingPrevious: boolean;

	/** Search query */
	searchQuery?: string;
	currentMatchIndex?: number;
	totalMatches?: number;
	matchesByLogIndex?: Map<number, MatchRange[]>;
	activeMatchLogIndex?: number;
	activeMatchWithinLog?: number;
};

export function VirtuosoLogsViewer({
	logs,
	firstItemIndex,
	loadOlderLogs,
	isLoadingPrevious,
	searchQuery,
	currentMatchIndex = 0,
	totalMatches = 0,
	matchesByLogIndex,
	activeMatchLogIndex = -1,
	activeMatchWithinLog = -1
}: VirtuosoLogsViewerProps) {
	const virtuosoRef = useRef<VirtuosoHandle>(null);

	const activeListIndex = useMemo(() => {
		if (totalMatches < 1 || activeMatchLogIndex < 0) return -1;
		return activeMatchLogIndex;
	}, [activeMatchLogIndex, totalMatches]);

	useEffect(() => {
		if (activeListIndex < 0) return;
		requestAnimationFrame(() => {
			virtuosoRef.current?.scrollToIndex({
				index: activeListIndex,
				align: "center"
			});
		});
	}, [activeListIndex, currentMatchIndex, searchQuery]);

	if (logs.length < 1) {
		return (
			<div className="flex flex-1 flex-col">
				<EmptyStateLogs title="No logs found" subtitle="No logs found" />
			</div>
		);
	}

	return (
		<div className="flex flex-1 flex-col">
			<Header />
			<Virtuoso
				ref={virtuosoRef}
				firstItemIndex={firstItemIndex}
				initialTopMostItemIndex={Math.max(logs.length - 1, 0)}
				followOutput="auto"
				context={{ isLoadingPrevious }}
				components={{
					Header: ({ context }) => <LoadingHeader shouldRender={context.isLoadingPrevious} />
				}}
				startReached={() => {
					if (isLoadingPrevious) return;
					loadOlderLogs();
				}}
				minOverscanItemCount={8}
				data={logs}
				computeItemKey={(_, entry) => entry.id ?? entry.timestamp ?? ""}
				itemContent={(absoluteIndex, data) => {
					const relativeIndex = absoluteIndex - firstItemIndex;
					return (
						<LogLine
							entry={data}
							matchRanges={matchesByLogIndex?.get(relativeIndex)}
							activeMatchIndex={relativeIndex === activeMatchLogIndex ? activeMatchWithinLog : -1}
						/>
					);
				}}
			/>
		</div>
	);
}

function Header() {
	return (
		<div
			className={cn(
				"grid min-w-[600px] gap-x-3 bg-theme-surface-tertiary px-4 py-1 text-text-sm font-semibold text-theme-text-secondary",
				LOG_VIEWER_2_GRID_COLUMNS_CLASS
			)}
		>
			<span>Type</span>
			<span>Time</span>
			<span>Event</span>
		</div>
	);
}

function LoadingHeader({ shouldRender }: { shouldRender: boolean }) {
	if (!shouldRender) return null;
	return (
		<div className="flex h-[36px] w-full items-center justify-center gap-2 border-b border-theme-border-minimal bg-theme-surface-primary">
			<Spinner className="h-5 w-5 shrink-0 border-[3px]" />
			<span>Loading...</span>
		</div>
	);
}
