import Spinner from "@/assets/icons/spinner.svg?react";
import { DisplayDate } from "@/components/DisplayDate";
import { ErrorFallback } from "@/components/Error";
import { InlineAvatar } from "@/components/InlineAvatar";
import { Key, KeyValue, Value } from "@/components/KeyValue";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { useComponentDetail } from "@/data/components/component-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import {
	Skeleton,
	Tag,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library";
import { Codesnippet } from "../../CodeSnippet";
import { CollapsibleCard } from "../../CollapsibleCard";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import Run from "@/assets/icons/terminal-square.svg?react";
import { Link } from "react-router-dom";
import { routes } from "@/router/routes";
import Pipelines from "@/assets/icons/dataflow.svg?react";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";

type Props = {
	artifactVersionId: string;
};

export function DetailsCard({ artifactVersionId }: Props) {
	const {
		data: artifactVersion,
		isPending: isArtifactVersionPending,
		isError: isArtifactVersionError,
		error
	} = useArtifactVersion({ versionId: artifactVersionId });

	const producerId = artifactVersion?.metadata?.producer_step_run_id;
	const { data: stepData } = useStepDetail(
		{
			stepId: producerId!
		},
		{ enabled: !!producerId }
	);

	const { data: pipeline } = usePipelineRun(
		{
			runId: artifactVersion?.body?.producer_pipeline_run_id as string
		},
		{ throwOnError: true, enabled: !!artifactVersion?.body?.producer_pipeline_run_id }
	);

	if (isArtifactVersionPending) return <Skeleton className="h-[500px] w-full" />;
	if (isArtifactVersionError) return <ErrorFallback err={error} />;

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				{pipeline && (
					<>
						<KeyValue
							label="Pipeline"
							value={
								<Link
									to={routes.pipelines.namespace(
										encodeURIComponent(pipeline.body?.pipeline?.name as string)
									)}
								>
									<Tag
										color="purple"
										className="inline-flex items-center gap-0.5"
										rounded={false}
										emphasis="subtle"
									>
										<Pipelines className="mr-1 h-4 w-4 fill-theme-text-brand" />
										{pipeline.body?.pipeline?.name}

										<div className="rounded-sm bg-primary-50 px-1 py-0.25">
											{pipeline.body?.pipeline?.body?.version}
										</div>
									</Tag>
								</Link>
							}
						/>
					</>
				)}

				{artifactVersion.body?.producer_pipeline_run_id && (
					<KeyValue
						label="Producer Run"
						value={
							<Link to={routes.runs.detail(artifactVersion.body?.producer_pipeline_run_id)}>
								<Tag
									color={getExecutionStatusTagColor(stepData?.body?.status)}
									className="inline-flex items-center gap-0.5"
									rounded={false}
									emphasis="subtle"
								>
									{stepData?.body?.status === "running" ? (
										<Spinner className="mr-1 h-4 w-4 border-[2px]" />
									) : (
										<Run className={`mr-1 h-4 w-4 fill-current`} />
									)}
									{artifactVersion.body?.producer_pipeline_run_id}
								</Tag>
							</Link>
						}
					/>
				)}
				{artifactVersion.metadata?.producer_step_run_id && (
					<KeyValue
						label="Producer Step"
						value={
							<Tag
								color={getExecutionStatusTagColor(stepData?.body?.status)}
								className="inline-flex items-center gap-0.5"
								rounded={false}
								emphasis="subtle"
							>
								{stepData?.body?.status === "running" ? (
									<Spinner className="mr-1 h-4 w-4 border-[2px]" />
								) : (
									<ExecutionStatusIcon className="fill-current" status={stepData?.body?.status} />
								)}
								{stepData ? stepData?.name : <Skeleton className="h-5 w-5" />}
							</Tag>
						}
					/>
				)}
				<KeyValue label="Type" value={artifactVersion.body?.type} />
				<KeyValue
					label="Author"
					value={
						<div className="inline-flex items-center gap-1">
							<InlineAvatar username={artifactVersion.body?.user?.name || ""} />
						</div>
					}
				/>
				<KeyValue
					label="Updated"
					value={<DisplayDate dateString={artifactVersion.body!.updated || ""} />}
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
