import ArrowLeft from "@/assets/icons/arrow-left.svg?react";
import Refresh from "@/assets/icons/refresh.svg?react";
import { logQueries } from "@/data/logs";
import { LogEntriesQueryParams, LogEntryInternal } from "@/types/logs";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "@zenml-io/react-component-library/components/server";
import { LogViewerToolbar } from "./log-viewer-toolbar";

export type LogProps = {
	queries: LogEntriesQueryParams;
	selectedSourceId: string;
};

export function RefreshLogsButton({ queries, selectedSourceId }: LogProps) {
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

type SearchNavigationButtonsProps = {
	totalMatches: number;
	onPreviousMatch: () => void;
	onNextMatch: () => void;
};

export function SearchNavigationButtons({
	totalMatches,
	onPreviousMatch,
	onNextMatch
}: SearchNavigationButtonsProps) {
	return (
		<LogViewerToolbar.MatchControls>
			<Button
				className="group aspect-square items-center justify-center"
				size="sm"
				emphasis="minimal"
				intent="secondary"
				onClick={onPreviousMatch}
				disabled={totalMatches === 0}
				title="Previous match"
			>
				<ArrowLeft className="h-4 w-4 shrink-0 rotate-90 fill-theme-text-tertiary group-disabled:fill-theme-text-tertiary/40" />
			</Button>
			<Button
				className="group aspect-square items-center justify-center"
				size="sm"
				emphasis="minimal"
				intent="secondary"
				onClick={onNextMatch}
				disabled={totalMatches === 0}
				title="Next match"
			>
				<ArrowLeft className="h-4 w-4 shrink-0 -rotate-90 fill-theme-text-tertiary group-disabled:fill-theme-text-tertiary/40" />
			</Button>
		</LogViewerToolbar.MatchControls>
	);
}

export function getOriginalLogText(logs: LogEntryInternal[]) {
	return logs.map((log) => log.originalEntry).join("\n");
}
