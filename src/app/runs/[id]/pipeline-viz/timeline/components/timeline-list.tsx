import { VirtualizedItem } from "@/lib/timeline/types";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { TimelineListItem } from "./timeline-list-item";
import {
	PlaceholderListItem,
	TimelinePlaceholderSeparator
} from "./timeline-placeholder-list-items";

type Props = {
	timelineItems: VirtualizedItem[];
	earliestStartTime: number;
	runStatus: ExecutionStatus;
	totalTimelineSpanMs: number;
};

export function TimelineList({
	timelineItems,
	earliestStartTime,
	runStatus,
	totalTimelineSpanMs
}: Props) {
	const parentRef = useRef<HTMLDivElement>(null);

	const count = timelineItems.length;
	const virtualizer = useVirtualizer({
		count,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 120
	});

	const items = virtualizer.getVirtualItems();

	return (
		<div ref={parentRef} className="flex-1 overflow-auto p-3 contain-strict">
			<div
				style={{
					height: virtualizer.getTotalSize(),
					width: "100%",
					position: "relative"
				}}
			>
				<div
					className="divide-y divide-theme-border-moderate overflow-hidden rounded-md border border-theme-border-moderate bg-theme-surface-primary"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						transform: `translateY(${items[0]?.start ?? 0}px)`
					}}
				>
					{items.map((virtualRow) => {
						const filteredItem = timelineItems[virtualRow.index];
						const type = filteredItem.type;
						return (
							<div
								key={virtualRow.key}
								data-index={virtualRow.index}
								ref={virtualizer.measureElement}
							>
								{type === "timeline" && (
									<TimelineListItem
										runStatus={runStatus}
										timelineItem={filteredItem.item}
										earliestStartTime={earliestStartTime}
										totalTimelineSpanMs={totalTimelineSpanMs}
									/>
								)}
								{type === "separator" && <TimelinePlaceholderSeparator />}
								{type === "placeholder" && (
									<PlaceholderListItem stepName={filteredItem.item.name} runStatus={runStatus} />
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
