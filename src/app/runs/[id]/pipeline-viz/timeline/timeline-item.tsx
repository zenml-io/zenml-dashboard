import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { TimelineItem as TimelineItemType } from "@/lib/timeline/types";
import {
	TooltipProvider,
	Tooltip,
	TooltipTrigger,
	TooltipContent
} from "@zenml-io/react-component-library";

type Props = {
	timelineItem: TimelineItemType;
};
export function TimelineItem({ timelineItem }: Props) {
	const stepDuration = timelineItem.step.metadata.duration;
	const stepName = timelineItem.step.name;
	const stepStatus = timelineItem.step.metadata.status;
	return (
		<div className="flex items-center gap-1 px-3 py-1 text-text-sm">
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
			<div className="font-semibold">{stepName}</div>
			{stepDuration !== undefined && (
				<div className="text-theme-text-secondary">{stepDuration} sec</div>
			)}
		</div>
	);
}
