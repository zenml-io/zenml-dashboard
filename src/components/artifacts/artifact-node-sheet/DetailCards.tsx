import Pipelines from "@/assets/icons/pipeline.svg?react";
import Spinner from "@/assets/icons/spinner.svg?react";
import Run from "@/assets/icons/terminal-square.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { ErrorFallback } from "@/components/Error";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { useComponentDetail } from "@/data/components/component-detail-query";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { routes } from "@/router/routes";
import {
	Skeleton,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Link } from "react-router-dom";
import { Codesnippet } from "../../CodeSnippet";
import { CollapsibleCard } from "../../CollapsibleCard";

type Props = {
	artifactVersionId: string;
};

export function DetailsCard({ artifactVersionId }: Props) {
	const artifactVersion = useArtifactVersion({ versionId: artifactVersionId });

	const producerRunId = artifactVersion?.data?.body?.producer_pipeline_run_id;

	const pipelineRun = usePipelineRun(
		{
			runId: producerRunId as string
		},
		{ throwOnError: true, enabled: !!producerRunId }
	);

	const producerId = artifactVersion.data?.metadata?.producer_step_run_id;
	const stepDetail = useStepDetail(
		{
			stepId: producerId!
		},
		{ enabled: !!producerId }
	);

	if (artifactVersion.isPending || pipelineRun.isPending)
		return <Skeleton className="h-[500px] w-full" />;
	if (artifactVersion.isError || pipelineRun.isError)
		return <ErrorFallback err={artifactVersion.error! || pipelineRun.error!} />;

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<KeyValue
					label="Pipeline"
					value={
						<Link
							to={routes.pipelines.namespace(
								encodeURIComponent(pipelineRun.data.body?.pipeline?.name as string)
							)}
						>
							<Tag
								color="purple"
								className="inline-flex items-center gap-0.5"
								rounded={false}
								emphasis="subtle"
							>
								<Pipelines className="mr-1 h-4 w-4 fill-theme-text-brand" />
								{pipelineRun.data.body?.pipeline?.name}

								<div className="rounded-sm bg-primary-50 px-1 py-0.25">
									{pipelineRun.data.body?.pipeline?.body?.version}
								</div>
							</Tag>
						</Link>
					}
				/>
				{artifactVersion.data.body?.producer_pipeline_run_id && pipelineRun.data.body?.status && (
					<KeyValue
						label="Producer Run"
						value={
							<Link to={routes.runs.detail(artifactVersion.data.body?.producer_pipeline_run_id)}>
								<Tag
									color={getExecutionStatusTagColor(pipelineRun.data.body?.status)}
									className="inline-flex items-center gap-0.5"
									rounded={false}
									emphasis="subtle"
								>
									{pipelineRun.data.body?.status === "running" ? (
										<Spinner className="mr-1 h-4 w-4 border-[2px]" />
									) : (
										<Run className={`mr-1 h-4 w-4 fill-current`} />
									)}

									{artifactVersion.data.body?.producer_pipeline_run_id}
								</Tag>
							</Link>
						}
					/>
				)}
				{artifactVersion.data.body?.artifact.id && (
					<KeyValue
						label="Producer Step"
						value={
							<>
								{stepDetail.data ? (
									<Tag
										color={getExecutionStatusTagColor(pipelineRun.data.body?.status)}
										className="inline-flex items-center gap-0.5"
										rounded={false}
										emphasis="subtle"
									>
										{pipelineRun.data.body?.status === "running" ? (
											<Spinner className="mr-1 h-4 w-4 border-[2px]" />
										) : (
											<ExecutionStatusIcon
												className="mr-1 fill-current"
												status={pipelineRun.data.body?.status}
											/>
										)}
										{stepDetail.data.name}
									</Tag>
								) : (
									<Skeleton className="h-full w-[150px]" />
								)}
							</>
						}
					/>
				)}

				<KeyValue label="Type" value={artifactVersion.data.body?.type} />
				<KeyValue
					label="Author"
					value={
						<div className="inline-flex items-center gap-1">
							<InlineAvatar username={artifactVersion.data.body?.user?.name || ""} />
						</div>
					}
				/>
				<KeyValue
					label="Updated"
					value={<DisplayDate dateString={artifactVersion.data.body?.updated || ""} />}
				/>
			</dl>
		</CollapsibleCard>
	);
}

export function DataCard({ artifactVersionId }: Props) {
	const {
		data: artifactVersionData,
		isPending: isArtifactVersionPending,
		isError: isArtifactVersionError,
		error: artifactVersionError
	} = useArtifactVersion({ versionId: artifactVersionId });

	const artifactStoreId = artifactVersionData?.metadata?.artifact_store_id;
	const { data: storeData, isSuccess: isStoreSuccess } = useComponentDetail(
		{
			componentId: artifactStoreId!
		},
		{ enabled: !!artifactStoreId }
	);

	if (isArtifactVersionError) {
		return <ErrorFallback err={artifactVersionError} />;
	}

	if (isArtifactVersionPending) return <Skeleton className="h-[500px] w-full" />;

	return (
		<CollapsibleCard initialOpen title="Data">
			<dl className="grid w-full grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<Key className="col-span-3">URI</Key>
				<Value className="col-span-3 h-auto">
					<Codesnippet
						fullWidth
						codeClasses="truncate"
						code={artifactVersionData.body?.uri || ""}
					/>
				</Value>

				{artifactVersionData.metadata?.artifact_store_id && (
					<KeyValue
						label="Artifact Store"
						value={
							<>
								{isStoreSuccess ? (
									<Tag
										emphasis="subtle"
										rounded={false}
										color="grey"
										className="text-theme-text-primary"
									>
										{storeData?.name}
									</Tag>
								) : (
									<Skeleton className="h-6 w-12" />
								)}
							</>
						}
					/>
				)}
				<KeyValue
					label="Data Type"
					value={
						<Tag
							className="flex w-fit items-center text-theme-text-primary"
							color="grey"
							emphasis="subtle"
							rounded={false}
						>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="cursor-auto">
										{artifactVersionData.body?.data_type.attribute}
									</TooltipTrigger>
									<TooltipContent>
										{artifactVersionData.body?.data_type.module}.
										{artifactVersionData.body?.data_type.attribute}{" "}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</Tag>
					}
				/>
			</dl>
		</CollapsibleCard>
	);
}

export function CodeCard({ artifactVersionId }: Props) {
	function returnConfigSchema(id: string) {
		return `from zenml.client import Client

artifact = Client().get_artifact_version('${id}')
loaded_artifact = artifact.load()`;
	}

	return (
		<CollapsibleCard initialOpen title="Code">
			<Codesnippet fullWidth highlightCode wrap code={returnConfigSchema(artifactVersionId)} />
		</CollapsibleCard>
	);
}
