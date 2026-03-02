import { LogEntryInternal } from "@/types/logs";
import { cn } from "@zenml-io/react-component-library/utilities";
import { Virtuoso } from "react-virtuoso";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";
import { LogLine } from "./log-line";
import { EmptyStateLogs } from "../empty-state-logs";

type LogViewer2VirtuosoProps = {
	logs: LogEntryInternal[];
};

export function LogViewer2Virtuoso({ logs }: LogViewer2VirtuosoProps) {
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
				initialTopMostItemIndex={Math.max(logs.length - 1, 0)}
				followOutput="auto"
				minOverscanItemCount={8}
				data={logs}
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
