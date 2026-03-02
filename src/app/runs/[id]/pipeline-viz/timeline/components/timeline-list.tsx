import { VirtualizedItem } from "@/lib/timeline/types";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Components, Virtuoso } from "react-virtuoso";
import { TimelineListItem } from "./timeline-list-item";
import {
	PlaceholderListItem,
	TimelinePlaceholderSeparator
} from "./timeline-placeholder-list-items";
import { forwardRef } from "react";

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
	return (
		<div className="flex-1 overflow-auto py-3">
			<Virtuoso
				components={{
					List
				}}
				minOverscanItemCount={8}
				data={timelineItems}
				itemContent={(_, data) => {
					const { type } = data;
					return (
						<>
							{type === "timeline" && (
								<TimelineListItem
									runStatus={runStatus}
									timelineItem={data.item}
									earliestStartTime={earliestStartTime}
									totalTimelineSpanMs={totalTimelineSpanMs}
								/>
							)}
							{type === "separator" && <TimelinePlaceholderSeparator />}
							{type === "placeholder" && (
								<PlaceholderListItem stepName={data.item.name} runStatus={runStatus} />
							)}
						</>
					);
				}}
			/>
		</div>
	);
}

const List: Components["List"] = forwardRef(({ style, children, ...props }, ref) => {
	return (
		<div
			style={style}
			ref={ref}
			className="mx-3 divide-y divide-theme-border-moderate rounded-md border border-theme-border-moderate bg-theme-surface-primary"
			{...props}
		>
			{children}
		</div>
	);
});
