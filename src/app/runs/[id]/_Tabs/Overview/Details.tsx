import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { Key, Value } from "@/components/KeyValue";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	Tag
} from "@zenml-io/react-component-library";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function Details() {
	const { runId } = useParams() as { runId: string };
	const [open, setOpen] = useState(true);

	const { data, isError, isPending } = usePipelineRun({ runId: runId }, { throwOnError: true });

	if (isError) return null;
	if (isPending) return <Skeleton className="h-[200px] w-full" />;

	return (
		<CollapsiblePanel open={open} onOpenChange={setOpen}>
			<CollapsibleHeader className="flex items-center gap-[10px]">
				<CollapsibleTrigger className="flex w-full items-center gap-[10px]">
					<ChevronDown
						className={` ${
							open ? "" : "-rotate-90"
						} h-5 w-5 rounded-md fill-neutral-500 transition-transform duration-200 hover:bg-neutral-200`}
					/>
					<span>Details</span>
				</CollapsibleTrigger>
			</CollapsibleHeader>
			<CollapsibleContent className="border-t border-theme-border-moderate bg-theme-surface-primary px-5 py-3">
				<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
					<Key>Id</Key>
					<Value>
						<div className="group/copybutton flex items-center gap-0.5">
							{data.id}
							<CopyButton copyText={data.id} />
						</div>
					</Value>
					<Key>Status</Key>
					<Value>
						<Tag
							className="inline-flex items-center gap-0.5"
							emphasis="subtle"
							color={getExecutionStatusTagColor(data.body?.status)}
						>
							<ExecutionStatusIcon className="fill-current" status={data.body?.status} />
							{data.body?.status}
						</Tag>
					</Value>
					<Key>Pipeline</Key>
					<Value>
						<Tag
							color="purple"
							className="inline-flex items-center gap-0.5"
							rounded={false}
							emphasis="subtle"
						>
							<Pipelines className="h-4 w-4 fill-theme-text-brand" />
							{data.body?.pipeline?.name}
							<div className="rounded-sm bg-primary-50 px-1 py-0.25">
								{data.body?.pipeline?.body?.version}
							</div>
						</Tag>
					</Value>
					<Key>Start Time</Key>
					<Value>
						<DisplayDate dateString={data.metadata?.start_time || ""} />
					</Value>
					<Key>End Time</Key>
					<Value>
						<DisplayDate dateString={data.metadata?.end_time || ""} />
					</Value>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
