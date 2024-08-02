import Github from "@/assets/icons/github.svg?react";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { InlineAvatar } from "@/components/InlineAvatar";
import { useCodeRepository } from "@/data/code-repositories/code-repositories-detail-query";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { transformToEllipsis } from "@/lib/strings";
import { routes } from "@/router/routes";
import { Badge, Skeleton, Tag } from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { Codesnippet } from "../../CodeSnippet";
import { CollapsibleCard } from "../../CollapsibleCard";
import { DisplayDate } from "../../DisplayDate";
import { ErrorFallback } from "../../Error";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "../../ExecutionStatus";
import { Key, KeyValue, Value } from "../../KeyValue";

type Props = {
	stepId: string;
	runId: string;
};

export type Metadata = {
	orchestrator_url?: string;
};

export function StepDetailsTab({ stepId, runId }: Props) {
	const { data, isError, isPending, error } = useStepDetail({ stepId });
	const { data: pipelineRunData } = usePipelineRun({ runId });

	const repository = pipelineRunData?.body?.code_reference?.body?.code_repository;

	const { data: codeRepositoryData } = useCodeRepository(
		{ repositoryId: repository?.id as string },
		{ throwOnError: true, enabled: !!repository?.id }
	);

	const repositoryMetadata = codeRepositoryData?.metadata?.config;

	if (isError) return <ErrorFallback err={error} />;
	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const enable_cache = data.metadata?.config?.enable_cache;
	const orchestrator_url = (pipelineRunData?.metadata as Metadata)?.orchestrator_url;
	const orchestrator_run_id = pipelineRunData?.metadata?.orchestrator_run_id;

	const enable_artifact_metadata = data.metadata?.config?.enable_artifact_metadata;
	const enable_artifact_visualization = data.metadata?.config?.enable_artifact_visualization;

	const getRepositoryLink = () => {
		let name: string = repository?.name as string;
		let url: string | null = "";

		if (repository?.body?.source?.attribute === "GitHubCodeRepository") {
			name = `${repositoryMetadata?.owner}/${repositoryMetadata?.repository}`;
			url = `https://www.github.com/${name}`;
		} else if (repository?.body?.source?.attribute === "GitLabCodeRepository") {
			name = `${repositoryMetadata?.group}/${repositoryMetadata?.project}`;
			url = `https://www.gitlab.com/${name}`;
		}

		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				className={`flex items-center ${url ? "" : "pointer-events-none"}`}
				onClick={(e) => e.stopPropagation()}
				href={url}
			>
				<Github className="mr-1 h-5 w-5 fill-theme-text-brand" />
				{name}
			</a>
		);
	};

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<KeyValue
					label="Orchestrator url"
					value={
						orchestrator_url ? (
							<div className="group/copybutton flex items-center gap-0.5">
								{orchestrator_url}
								<CopyButton copyText={orchestrator_url} />
							</div>
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="Orchestrator run Id"
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
						<div className="flex items-center gap-1">
							<Tag
								color={getExecutionStatusTagColor(data.body?.status)}
								rounded
								emphasis="subtle"
								className="flex w-fit items-center gap-1 capitalize"
							>
								<ExecutionStatusIcon className="fill-current" status={data.body?.status} />
								{data.body?.status}
							</Tag>
							{typeof enable_cache === "boolean" && (
								<Badge size="sm" color={enable_cache ? "green" : "grey"}>
									{enable_cache ? "Enable cache" : "Disabled cache"}
								</Badge>
							)}
						</div>
					}
				></KeyValue>
				{/* TODO ModelVersion */}
				{/* {modelVersion && (
					<KeyValue
						label="Model"
						value={
							<Link
								href={routes.organizations.tenants.dashboard.models.detail(
									orgId,
									tenantID,
									modelId || ""
								)}
							>
								<div className="flex items-center">
									<Tag
										rounded={false}
										emphasis="subtle"
										color="yellow"
										className="flex w-fit items-center gap-1 "
									>
										<Model className="h-4 w-4 fill-warning-500" />
										{modelVersion?.name}
										<div className="rounded-sm bg-warning-200 px-1 py-0.25">
											{modelVersion?.body?.latest_version_name}
										</div>
									</Tag>
								</div>
							</Link>
						}
					/>
				)} */}
				{pipelineRunData ? (
					<>
						<KeyValue
							label="Pipeline"
							value={
								<Link
									to={routes.pipelines.namespace(
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
						{pipelineRunData.body?.code_reference && repositoryMetadata && (
							<KeyValue
								label="Repository/Commit"
								value={
									<div className="group/copybutton mr-1">
										<Tag
											color="grey"
											className="inline-flex items-center  font-semibold text-neutral-900"
											rounded={false}
											emphasis="subtle"
										>
											{getRepositoryLink()}
											<div className="ml-1 rounded-sm bg-neutral-200 px-1 py-0.25">
												{transformToEllipsis(
													pipelineRunData?.body?.code_reference?.body?.commit as string,
													10
												)}
											</div>
										</Tag>
										<CopyButton
											copyText={pipelineRunData?.body?.code_reference?.body?.commit as string}
										/>
									</div>
								}
							/>
						)}
						<Key className={pipelineRunData.metadata?.code_path ? "col-span-3" : ""}>Code Path</Key>
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
							<InlineAvatar username={data.body?.user?.name as string} />
						</div>
					}
				/>
				<KeyValue
					label="Start Time"
					value={
						data.metadata?.start_time ? (
							<DisplayDate dateString={data.metadata?.start_time} />
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="End Time"
					value={
						data.metadata?.end_time ? (
							<DisplayDate dateString={data.metadata?.end_time} />
						) : (
							"Not available"
						)
					}
				/>
				<KeyValue
					label="Duration"
					value={calculateTimeDifference(
						data.metadata?.start_time || "",
						data.metadata?.end_time || ""
					)}
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
