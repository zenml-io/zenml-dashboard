import Info from "@/assets/icons/info.svg?react";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { InlineAvatar } from "@/components/InlineAvatar";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { isString } from "@/lib/type-guards";
import { routes } from "@/router/routes";
import { MetadataMap } from "@/types/common";
import {
	Badge,
	Skeleton,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Link, useParams } from "react-router-dom";
import { Codesnippet } from "../../CodeSnippet";
import { CollapsibleCard } from "../../CollapsibleCard";
import { DisplayDate } from "../../DisplayDate";
import { ErrorFallback } from "../../Error";
import { Key, KeyValue, Value } from "../../KeyValue";
import { RepoBadge } from "../../repositories/RepoBadge";
import { AuthRequired } from "../../runs/auth-required";
import { StepStatusTooltip } from "./step-status-tooltip";

type Props = {
	stepId: string;
	runId: string;
};

export function StepDetailsTab({ stepId, runId }: Props) {
	const { data, isError, isPending, error } = useStepDetail({ stepId });
	const { data: pipelineRunData } = usePipelineRun({ runId });

	const repository = pipelineRunData?.body?.code_reference?.body?.code_repository;

	if (isError) return <ErrorFallback err={error} />;
	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const enable_artifact_metadata = data.metadata?.config?.enable_artifact_metadata;
	const enable_artifact_visualization = data.metadata?.config?.enable_artifact_visualization;

	const isStatusUnknown = getIsStatusUnknown(
		data.body?.status ?? "running",
		pipelineRunData?.body?.status ?? "running"
	);

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<KeyValue
					label="Id"
					value={
						<div className="group/copybutton flex items-center gap-0.5">
							{data.id}
							<CopyButton copyText={data.id} />
						</div>
					}
				/>
				<KeyValue
					label="Status"
					value={
						<div className="flex items-center gap-0.5 overflow-x-auto">
							<StepStatusTooltip
								stepStatus={data.body?.status ?? "running"}
								isStatusUnknown={isStatusUnknown}
							/>
						</div>
					}
				></KeyValue>
				{pipelineRunData ? (
					<>
						<KeyValue
							label="Pipeline"
							value={
								<Link
									to={routes.projects.pipelines.namespace(
										encodeURIComponent(pipelineRunData.body?.pipeline?.name as string)
									)}
								>
									<Tag
										color="purple"
										className="inline-flex items-center gap-0.5"
										rounded={false}
										emphasis="subtle"
									>
										<Pipelines className="mr-1 h-4 w-4 fill-theme-text-brand" />
										{pipelineRunData.body?.pipeline?.name}
									</Tag>
								</Link>
							}
						/>
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
							{pipelineRunData.body?.code_reference ? (
								<RepoBadge
									repositoryId={repository?.id}
									commit={pipelineRunData.body.code_reference.body?.commit}
								/>
							) : (
								"Not available"
							)}
						</Value>
						<Key className={pipelineRunData.metadata?.code_path ? "col-span-3" : ""}>
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
						<Value className={pipelineRunData.metadata?.code_path ? "col-span-3 h-auto" : ""}>
							{pipelineRunData.metadata?.code_path ? (
								<Codesnippet code={pipelineRunData.metadata.code_path} />
							) : (
								"Not available"
							)}
						</Value>
					</>
				) : (
					<Skeleton className="h-6 w-full" />
				)}

				<KeyValue
					label="Cache key"
					value={
						<div className="group/copybutton flex items-center gap-0.5">
							{data.metadata?.cache_key}
							<CopyButton copyText={data.metadata?.cache_key as string} />
						</div>
					}
				/>
				<KeyValue
					label="Author"
					value={
						<div className="inline-flex items-center gap-1">
							<InlineAvatar username={data.resources?.user?.name as string} />
						</div>
					}
				/>
				<KeyValue
					label="Start Time"
					value={
						data.body?.start_time ? (
							<DisplayDate dateString={data.body?.start_time} />
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="End Time"
					value={
						data.body?.end_time ? <DisplayDate dateString={data.body?.end_time} /> : "Not available"
					}
				/>
				<KeyValue
					label="Duration"
					value={calculateTimeDifference(data.body?.start_time || "", data.body?.end_time || "")}
				/>
				<KeyValue
					label="Artifact metadata"
					value={
						<Badge size="sm" color={enable_artifact_metadata ? "green" : "grey"}>
							{enable_artifact_metadata ? "Enable" : "Disabled"}
						</Badge>
					}
				/>
				<KeyValue
					label="Artifact visualization"
					value={
						<Badge size="sm" color={enable_artifact_visualization ? "green" : "grey"}>
							{enable_artifact_visualization ? "Enable" : "Disabled"}
						</Badge>
					}
				/>
			</dl>
		</CollapsibleCard>
	);
}

export function OrchestratorCard({ className }: { className?: string }) {
	const { runId } = useParams() as {
		runId: string;
	};

	const {
		data: pipelineData,
		isPending,
		isError
	} = usePipelineRun({ runId }, { throwOnError: true });

	const orchestrator_url = (pipelineData?.metadata?.run_metadata as MetadataMap)?.orchestrator_url;
	const orchestrator_logs = (pipelineData?.metadata?.run_metadata as MetadataMap)
		?.orchestrator_logs_url;
	const orchestrator_run_id = pipelineData?.metadata?.orchestrator_run_id;

	if (isError) {
		return <p>Failed to fetch Orchestrator Card</p>;
	}

	if (isPending) return <Skeleton className="h-[150px] w-full" />;

	return (
		<CollapsibleCard className={className} initialOpen title="Orchestrator">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<KeyValue
					label="Orchestrator URL"
					value={
						orchestrator_url && isString(orchestrator_url) ? (
							<div className="group/copybutton flex items-center gap-0.5">
								<a
									className="truncate underline transition-all duration-200 hover:decoration-transparent"
									rel="noopener noreferrer"
									target="_blank"
									href={orchestrator_url}
								>
									{orchestrator_url}
								</a>
								<CopyButton copyText={orchestrator_url} />
							</div>
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="Orchestrator Logs"
					value={
						orchestrator_logs && isString(orchestrator_logs) ? (
							<div className="flex items-center gap-1">
								<AuthRequired />
								<div className="group/copybutton flex items-center gap-0.5">
									<a
										className="truncate text-theme-text-brand underline transition-all duration-200 hover:decoration-transparent"
										rel="noopener noreferrer"
										target="_blank"
										href={orchestrator_logs}
									>
										{orchestrator_logs}
									</a>
									<CopyButton copyText={orchestrator_logs} />
								</div>
							</div>
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="Orchestrator Run ID"
					value={
						orchestrator_run_id ? (
							<div className="group/copybutton flex items-center gap-0.5">
								{orchestrator_run_id}
								<CopyButton copyText={orchestrator_run_id as string} />
							</div>
						) : (
							"Not available"
						)
					}
				/>
			</dl>
		</CollapsibleCard>
	);
}
