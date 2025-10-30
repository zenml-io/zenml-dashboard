import { CollapsibleChevron } from "@/components/collapsible-chevron";
import { DisplayDate } from "@/components/DisplayDate";
import { KeyValue } from "@/components/KeyValue";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { isBoolean } from "@/lib/type-guards";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton
} from "@zenml-io/react-component-library";
import { useState } from "react";

type Props = {
	runId: string;
};

export function ScheduleCollapsible({ runId }: Props) {
	const [open, setOpen] = useState(true);
	const { data, isError, isPending } = usePipelineRun({ runId });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[200px]" />;

	const schedule = data.resources?.schedule;

	if (!schedule) return null;

	const cron = schedule.body?.cron_expression;
	const startTime = schedule.body?.start_time;
	const endTime = schedule.body?.end_time;
	const intervalSecond = schedule.body?.interval_second;
	const catchup = schedule.body?.catchup;
	const runOnceStartTime = schedule.body?.run_once_start_time;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-2">
					<CollapsibleChevron open={open} />
					<p id="schedule-collapsible">Schedule</p>
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="space-y-3 border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<KeyValue label="Cron" value={cron ? <p>{cron}</p> : "Not available"} />
					<KeyValue
						label="Start Time"
						value={
							startTime ? (
								<p>
									<DisplayDate dateString={startTime} />
								</p>
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="End Time"
						value={
							endTime ? (
								<p>
									<DisplayDate dateString={endTime} />
								</p>
							) : (
								"Not available"
							)
						}
					/>
					<KeyValue
						label="Interval"
						value={intervalSecond ? <p>{intervalSecond} seconds</p> : "Not available"}
					/>
					<KeyValue
						label="Catchup"
						value={isBoolean(catchup) ? <p>{catchup ? "Yes" : "No"}</p> : "Not available"}
					/>
					<KeyValue
						label="Run Once Start Time"
						value={
							runOnceStartTime ? (
								<p>
									<DisplayDate dateString={runOnceStartTime} />
								</p>
							) : (
								"Not available"
							)
						}
					/>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
