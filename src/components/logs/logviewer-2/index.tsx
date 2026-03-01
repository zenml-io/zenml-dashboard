import { LogEntryInternal } from "@/types/logs";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "@zenml-io/react-component-library/utilities";
import { useRef } from "react";
import { LOG_VIEWER_2_GRID_COLUMNS_CLASS } from "./layout";
import { LogLine } from "./log-line";

type Props = {
	logs: LogEntryInternal[];
};

export function LogViewer2({ logs }: Props) {
	const parentRef = useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		overscan: 5,
		count: logs.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 40 // estimated single-line height
	});

	const virtualItems = virtualizer.getVirtualItems();
	return (
		<div className="flex flex-1 flex-col overflow-hidden">
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
							const entry = logs[logIndex];

							return (
								<div key={virtualRow.key} data-index={logIndex} ref={virtualizer.measureElement}>
									<LogLine entry={entry} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
