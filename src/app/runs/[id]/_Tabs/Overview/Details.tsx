import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Info from "@/assets/icons/info.svg?react";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, Value } from "@/components/KeyValue";
import { RepoBadge } from "@/components/repositories/RepoBadge";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { routes } from "@/router/routes";
import {
	CollapsibleContent,
	CollapsibleHeader,
	CollapsiblePanel,
	CollapsibleTrigger,
	Skeleton,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
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

	const statusReason = data.body?.status_reason;

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
						{(() => {
							const statusTag = (
								<Tag
									className="inline-flex items-center gap-0.5"
									emphasis="subtle"
									color={getExecutionStatusTagColor(data.body?.status)}
								>
									<ExecutionStatusIcon className="fill-current" status={data.body?.status} />
									{statusReason ?? data?.body?.status}
								</Tag>
							);

							return statusReason ? (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>{statusTag}</TooltipTrigger>
										<TooltipContent>{data?.body?.status}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								statusTag
							);
						})()}
					</Value>
					<Key>Pipeline</Key>
					<Value>
						{data.body?.pipeline ? (
							<Link
								to={routes.projects.pipelines.namespace(
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
						) : (
							"Not available"
						)}
					</Value>
					<Key>
						<div className="flex items-center space-x-0.5 truncate">
							<span className="truncate">Repository/Commit</span>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="cursor-default">
										<Info className="h-3 w-3 fill-theme-text-secondary" />
										<span className="sr-only">Info</span>
									</TooltipTrigger>
									<TooltipContent className="w-full max-w-md whitespace-normal">
										Git hash of code repository. Only set if pipeline was run in a clean git
										repository connected to your ZenML server.
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</Key>
					<Value className="h-auto">
						{data.body?.code_reference ? (
							<RepoBadge
								repositoryId={data.body?.code_reference.body?.code_repository.id}
								commit={data.body.code_reference.body?.commit}
							/>
						) : (
							"Not available"
						)}
					</Value>
					<Key className={data.metadata?.code_path ? "col-span-3" : ""}>
						<div className="flex items-center space-x-0.5 truncate">
							<span>Code Path</span>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="cursor-default">
										<Info className="h-3 w-3 fill-theme-text-secondary" />
										<span className="sr-only">Info</span>
									</TooltipTrigger>
									<TooltipContent className="w-full max-w-md whitespace-normal">
										Path to where code was uploaded in the artifact store. Only set on a pipeline
										with a non-local orchestrator and if Repository/Commit is not set
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</Key>
					<Value className={data.metadata?.code_path ? "col-span-3 h-auto" : ""}>
						{data.metadata?.code_path ? (
							<Codesnippet code={data.metadata.code_path} />
						) : (
							"Not available"
						)}
					</Value>
					<Key>Author</Key>
					<Value>
						<div className="inline-flex items-center gap-1">
							<InlineAvatar
								avatarUrl={data.resources?.user?.body?.avatar_url ?? undefined}
								username={data.resources?.user?.name ?? "Unknown"}
								isServiceAccount={!!data.resources?.user?.body?.is_service_account}
							/>
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
