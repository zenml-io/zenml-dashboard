import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { KeyValue } from "../../KeyValue";
import { Badge, Skeleton, Tag } from "@zenml-io/react-component-library";
import { DisplayDate } from "../../DisplayDate";
import { CollapsibleCard } from "../../CollapsibleCard";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "../../ExecutionStatus";
import { useStepDetail } from "@/data/steps/step-detail-query";
import Pipelines from "@/assets/icons/pipeline.svg?react";
import Spinner from "@/assets/icons/spinner.svg?react";
import { calculateTimeDifference } from "@/lib/dates";
import { ErrorFallback } from "../../Error";
import Github from "@/assets/icons/github.svg?react";
import { CopyButton } from "@/components/CopyButton";
import { transformToEllipsis } from "@/lib/strings";

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

	if (isError) return <ErrorFallback err={error} />;
	if (isPending) return <Skeleton className="h-[300px] w-full" />;

	const enable_cache = data.metadata?.config?.enable_cache;
	const orchestrator_url = (pipelineRunData?.metadata as Metadata)?.orchestrator_url;
	const orchestrator_run_id = pipelineRunData?.metadata?.orchestrator_run_id;

	const enable_artifact_metadata = data.metadata?.config?.enable_artifact_metadata;
	const enable_artifact_visualization = data.metadata?.config?.enable_artifact_visualization;

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<KeyValue label="Orchestrator url" value={orchestrator_url || "Not available"} />
				<KeyValue label="Orchestrator run Id" value={orchestrator_run_id || "Not available"} />
				<KeyValue label="Id" value={data.id} />
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
								<Tag
									color="purple"
									className="inline-flex items-center gap-0.5"
									rounded={false}
									emphasis="subtle"
								>
									<Pipelines className="mr-1 h-4 w-4 fill-theme-text-brand" />
									{pipelineRunData.body?.pipeline?.name}
									<div className="rounded-sm bg-primary-50 px-1 py-0.25">
										{pipelineRunData.body?.pipeline?.body?.version}
									</div>
								</Tag>
							}
						/>
						{pipelineRunData.body?.code_reference && (
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
											<Github className="mr-1 h-5 w-5 fill-theme-text-brand" />
											zenml.io/zenml
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
						<KeyValue
							label="Run"
							value={
								<Tag
									color="grey"
									className="inline-flex items-center gap-0.5"
									rounded={false}
									emphasis="subtle"
								>
									<Spinner className="mr-1 h-4 w-4" />
									{pipelineRunData.name}
								</Tag>
							}
						/>
					</>
				) : (
					<Skeleton className="h-6 w-full" />
				)}
				<KeyValue label="Cache key" value={data.metadata?.cache_key || ""} />
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
