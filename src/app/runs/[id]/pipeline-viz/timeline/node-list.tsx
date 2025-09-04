import { TimelineItem as TimelineItemType } from "@/lib/timeline/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { TimelineItem } from "./timeline-item";

type Props = {
	timelineItems: TimelineItemType[];
};

export function TimelineNodeList({ timelineItems }: Props) {
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
					className="divide-y divide-theme-border-moderate rounded-md border border-theme-border-moderate bg-theme-surface-primary"
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
						return (
							<div
								key={virtualRow.key}
								data-index={virtualRow.index}
								ref={virtualizer.measureElement}
								className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
							>
								<TimelineItem timelineItem={filteredItem} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
