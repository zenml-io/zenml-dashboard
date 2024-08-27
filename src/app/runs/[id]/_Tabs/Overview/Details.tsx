import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, Value } from "@/components/KeyValue";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { routes } from "@/router/routes";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	Tag
} from "@zenml-io/react-component-library";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

export function Details() {
	const { runId } = useParams() as { runId: string };
	const [open, setOpen] = useState(true);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const { data, isError, isPending } = usePipelineRun({ runId: runId }, { throwOnError: true });

	useEffect(() => {
		// To set current tab in URL
		const tabParam = searchParams.get("tab");
		if (!tabParam) {
			const newUrl = new URL(window.location.href);
			newUrl.searchParams.set("tab", "overview");
			const newPath = `${newUrl.pathname}${newUrl.search}`;
			navigate(newPath, { replace: true });
		}
	}, [searchParams, navigate]);

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
						<Link
							to={routes.pipelines.namespace(
								encodeURIComponent(data.body?.pipeline?.name as string)
							)}
						>
							<Tag
								color="purple"
								className="inline-flex items-center gap-0.5"
								rounded={false}
								emphasis="subtle"
							>
								<Pipelines className="h-4 w-4 fill-theme-text-brand" />
								{data.body?.pipeline?.name}
							</Tag>
						</Link>
					</Value>
					<Key>Author</Key>
					<Value>
						<div className="inline-flex items-center gap-1">
							<InlineAvatar username={data.body?.user?.name || ""} />
						</div>
					</Value>
					<Key>Start Time</Key>
					<Value>
						{data.metadata?.start_time ? (
							<DisplayDate dateString={data.metadata?.start_time} />
						) : (
							"Not available"
						)}
					</Value>
					<Key>End Time</Key>
					<Value>
						{data.metadata?.end_time ? (
							<DisplayDate dateString={data.metadata?.end_time} />
						) : (
							"Not available"
						)}
					</Value>
					<Key>Duration</Key>
					<Value>
						{data.metadata?.start_time && data.metadata?.end_time
							? calculateTimeDifference(data.metadata?.start_time, data.metadata?.end_time)
							: "Not available"}
					</Value>
				</dl>
			</CollapsibleContent>
		</CollapsiblePanel>
	);
}
