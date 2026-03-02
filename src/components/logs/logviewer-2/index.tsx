import { LogEntryInternal } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { Virtuoso } from "react-virtuoso";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";
import { LogLine } from "./log-line";
import { EmptyStateLogs } from "../empty-state-logs";
import { Spinner } from "@zenml-io/react-component-library/components/server";

type LogViewer2VirtuosoProps = {
	logs: LogEntryInternal[];
	firstItemIndex: number;
	loadOlderLogs: () => void;
	isLoadingPrevious: boolean;
};

export function LogViewer2Virtuoso({
	logs,
	firstItemIndex,
	loadOlderLogs,
	isLoadingPrevious
}: LogViewer2VirtuosoProps) {
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
				itemContent={(_, data) => <LogLine entry={data} />}
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
