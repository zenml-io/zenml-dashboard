import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { TimelineItem as TimelineItemType } from "@/lib/timeline/types";
import * as Collapsible from "@radix-ui/react-collapsible";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { TimelineDurationIndicator } from "./timeline-duration";
import { TimelineItemCollapsibleContent } from "./timeline-item-collapsible-content";
import { ExecutionStatus } from "@/types/pipeline-runs";

type Props = {
	timelineItem: TimelineItemType;
	earliestStartTime: number;
	runStatus: ExecutionStatus;
	totalTimelineSpanMs: number;
};
export function TimelineItem({
	timelineItem,
	earliestStartTime,
	runStatus,
	totalTimelineSpanMs
}: Props) {
	const [open, setOpen] = useState(false);
	const stepDuration = timelineItem.step.metadata.duration;
	const stepName = timelineItem.step.name;
	const stepStatus = timelineItem.step.metadata.status;
	return (
		<Collapsible.Root open={open} onOpenChange={setOpen} className="group">
			<div className="flex items-center gap-1 overflow-hidden text-text-sm group-data-[state=open]:border-b">
				<div className="flex w-full max-w-[180px] items-center gap-1 border-r border-theme-border-moderate px-3 py-1">
					<Collapsible.Trigger>
						<ChevronDown
							className={`size-3 rounded-sm fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200 group-data-[state=closed]:-rotate-90`}
						/>
					</Collapsible.Trigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<ExecutionStatusIcon className="size-3 shrink-0" status={stepStatus} />
							</TooltipTrigger>
							<TooltipContent className="capitalize" side="right">
								{stepStatus}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<Collapsible.Trigger className="flex-1 truncate text-left font-semibold">
						{stepName}
					</Collapsible.Trigger>
				</div>
				<div className="min-w-0 flex-1">
					{stepDuration !== undefined && (
						<TimelineDurationIndicator
							stepStatus={stepStatus}
							duration={stepDuration}
							startTimeMs={timelineItem.startTimeMs}
							earliestStartTime={earliestStartTime}
							totalTimelineSpanMs={totalTimelineSpanMs}
						/>
					)}
				</div>
			</div>
			<Collapsible.Content>
				<TimelineItemCollapsibleContent timelineItem={timelineItem} runStatus={runStatus} />
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
