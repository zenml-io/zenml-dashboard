import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import Info from "@/assets/icons/info.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { CopyButton } from "@/components/CopyButton";
import { DisplayDate } from "@/components/DisplayDate";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import { DownloadSnapshotCodeButton } from "@/components/pipeline-snapshots/download-snapshot-code-button";
import { SnapshotLink } from "@/components/pipeline-snapshots/snapshot-link";
import { PipelineLink } from "@/components/pipelines/pipeline-link";
import { RepoBadge } from "@/components/repositories/RepoBadge";
import { ScheduleTag } from "@/components/triggers/schedule-tag";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { snakeCaseToTitleCase } from "@/lib/strings";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { DeploymentTag } from "./deployment-tag";

type Props = {
	runId: string;
};

export function Details({ runId }: Props) {
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
	const executionMode = data.metadata?.config.execution_mode;

	const sourceSnapshot = data.resources?.source_snapshot;
	const deploymentId = data.metadata?.trigger_info?.deployment_id;
	const schedule = data.resources?.schedule;

	const codePath = data.metadata?.code_path;
	const snapshotId = data.resources?.snapshot?.id;

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
									{statusReason ?? data.body?.status}
								</Tag>
							);

							return statusReason ? (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>{statusTag}</TooltipTrigger>
										<TooltipContent>{data.body?.status}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							) : (
								statusTag
							);
						})()}
					</Value>

					<Key>Pipeline</Key>
					<Value>
						{data.resources?.pipeline ? (
							<PipelineLink
								pipelineId={data.resources?.pipeline?.id}
								pipelineName={data.resources?.pipeline?.name}
							/>
						) : (
							"Not available"
						)}
					</Value>
					<KeyValue
						label="Snapshot"
						value={
							sourceSnapshot && sourceSnapshot.name ? (
								<SnapshotLink snapshotId={sourceSnapshot.id} snapshotName={sourceSnapshot.name} />
							) : (
								"Not available"
							)
						}
					/>

					<KeyValue
						label="Deployment"
						value={deploymentId ? <DeploymentTag deploymentId={deploymentId} /> : "Not available"}
					/>
					<Key>Execution Mode</Key>
					<Value>{executionMode ? snakeCaseToTitleCase(executionMode) : "Not available"}</Value>
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
						{data.resources?.code_reference ? (
							<RepoBadge
								repositoryId={data.resources?.code_reference.body?.code_repository.id}
								commit={data.resources?.code_reference.body?.commit}
							/>
						) : (
							"Not available"
						)}
					</Value>
					{schedule && <KeyValue label="Triggered by" value={<ScheduleTag />} />}
					<Key className={data.metadata?.code_path ? "col-span-3" : ""}>
						<div className="flex w-full items-center justify-between">
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
							{snapshotId && codePath ? (
								<DownloadSnapshotCodeButton snapshotId={snapshotId} />
							) : null}
						</div>
					</Key>
					<Value className={data.metadata?.code_path ? "col-span-3 h-auto" : ""}>
						{data.metadata?.code_path ? (
							<Codesnippet fullWidth className="overflow-hidden" code={data.metadata.code_path} />
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
