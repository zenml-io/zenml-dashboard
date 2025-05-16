import Pipelines from "@/assets/icons/pipeline.svg?react";
import Run from "@/assets/icons/terminal-square.svg?react";
import { ComponentIcon } from "@/components/ComponentIcon";
import { DisplayDate } from "@/components/DisplayDate";
import { ErrorFallback } from "@/components/Error";
import { ExecutionStatusIcon, getExecutionStatusTagColor } from "@/components/ExecutionStatus";
import { InlineAvatar } from "@/components/InlineAvatar";
import { KeyValue } from "@/components/KeyValue";
import { useArtifactVersion } from "@/data/artifact-versions/artifact-version-detail-query";
import { componentQueries } from "@/data/components";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { getArtifactVersionSnippet } from "@/lib/code-snippets";
import { routes } from "@/router/routes";
import { useQuery } from "@tanstack/react-query";
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
import { DownloadArtifactButton } from "../download-artifact-button";

type Props = {
	artifactVersionId: string;
};

export function DetailsCard({ artifactVersionId }: Props) {
	const artifactVersion = useArtifactVersion({ versionId: artifactVersionId });

	const producerRunId = artifactVersion.data?.body?.producer_pipeline_run_id;

	const producerId = artifactVersion.data?.metadata?.producer_step_run_id;

	if (artifactVersion.isPending) return <Skeleton className="h-[500px] w-full" />;
	if (artifactVersion.isError) return <ErrorFallback err={artifactVersion.error} />;

	return (
		<CollapsibleCard initialOpen title="Details">
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				{producerRunId && <ProducerKeys producerRunId={producerRunId} />}
				{producerId && <ProducerStep producerStepId={producerId} />}
				<KeyValue
					label="Materializer"
					value={
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="cursor-default">
									{artifactVersion.data.body?.materializer.attribute}
								</TooltipTrigger>
								<TooltipContent align="start">
									{artifactVersion.data.body?.materializer.module}.
									{artifactVersion.data.body?.materializer.attribute}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					}
				/>
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

export function ProducerStep({ producerStepId }: { producerStepId: string }) {
	const stepDetail = useStepDetail({
		stepId: producerStepId
	});

	if (stepDetail.isPending)
		return <KeyValue label="Producer Step" value={<Skeleton className="h-5 w-full" />} />;
	if (stepDetail.isError) return null;
	return (
		<KeyValue
			label="Producer Step"
			value={
				<>
					{stepDetail.data ? (
						<Tag
							color={getExecutionStatusTagColor("completed")}
							className="inline-flex items-center gap-0.5"
							rounded={false}
							emphasis="subtle"
						>
							<ExecutionStatusIcon className="mr-1 fill-current" status={"completed"} />
							{stepDetail.data.name}
						</Tag>
					) : (
						<Skeleton className="h-full w-[150px]" />
					)}
				</>
			}
		/>
	);
}

function ProducerKeys({ producerRunId }: { producerRunId: string }) {
	const pipelineRun = usePipelineRun({
		runId: producerRunId as string
	});

	if (pipelineRun.isPending)
		return (
			<KeyValue
				label={<Skeleton className="h-5 w-full" />}
				value={<Skeleton className="h-5 w-full" />}
			/>
		);
	if (pipelineRun.isError) return null;
	return (
		<>
			<KeyValue
				label="Pipeline"
				value={
					<Link
						to={routes.projects.pipelines.namespace(
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
						</Tag>
					</Link>
				}
			/>
			<KeyValue
				label="Producer Run"
				value={
					<Link to={routes.projects.runs.detail(producerRunId)}>
						<Tag
							emphasis="subtle"
							rounded={false}
							className="inline-flex items-center gap-0.5"
							color={getExecutionStatusTagColor(pipelineRun.data.body?.status)}
						>
							<Run className={`mr-1 h-4 w-4 fill-current`} />
							{producerRunId.split("-")[0]}
						</Tag>
					</Link>
				}
			/>
		</>
	);
}

export function DataCard({ artifactVersionId }: Props) {
	const {
		data: artifactVersionData,
		isPending: isArtifactVersionPending,
		isError: isArtifactVersionError,
		error: artifactVersionError
	} = useArtifactVersion({ versionId: artifactVersionId });

	const artifactStoreId = artifactVersionData?.body?.artifact_store_id;

	if (isArtifactVersionError) {
		return <ErrorFallback err={artifactVersionError} />;
	}

	if (isArtifactVersionPending) return <Skeleton className="h-[500px] w-full" />;

	return (
		<CollapsibleCard initialOpen title="Data">
			<dl className="grid w-full grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				<dt className="col-span-3 flex items-center justify-between text-theme-text-secondary">
					Uri
					<DownloadArtifactButton artifactVersionId={artifactVersionId} />
				</dt>
				<dd className="col-span-3 w-full truncate text-neutral-700">
					<div className="pb-2">
						<Codesnippet fullWidth code={artifactVersionData.body!.uri} />
					</div>
				</dd>

				{artifactStoreId && (
					<KeyValue
						label="Artifact Store"
						value={<ArtifactStore artifactStoreId={artifactStoreId} />}
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
	return (
		<CollapsibleCard initialOpen title="Code">
			<Codesnippet
				fullWidth
				highlightCode
				wrap
				code={getArtifactVersionSnippet(artifactVersionId)}
			/>
		</CollapsibleCard>
	);
}

function ArtifactStore({ artifactStoreId }: { artifactStoreId: string }) {
	const artifactStoreQuery = useQuery({
		...componentQueries.componentDetail(artifactStoreId)
	});

	if (artifactStoreQuery.isPending) return <Skeleton className="h-6 w-12" />;
	if (artifactStoreQuery.isError) return <p>Error loading artifact store</p>;

	const artifactStore = artifactStoreQuery.data;
	const artifactStoreHref: string = routes.components.detail(artifactStoreId);
	const type = artifactStore.body?.type || "orchestrator";

	const logoUrl = artifactStore.body?.logo_url;

	return (
		<Link to={artifactStoreHref}>
			<Tag
				emphasis="subtle"
				rounded={false}
				className="flex w-fit items-center gap-0.5 text-theme-text-primary"
				color="grey"
			>
				{logoUrl ? (
					<img
						alt={artifactStore.name}
						width={20}
						height={20}
						className="shrink-0 object-contain"
						src={logoUrl}
					/>
				) : (
					<ComponentIcon
						className="aspect-square h-4 w-4 fill-primary-400 object-contain"
						type={type}
					/>
				)}
				{artifactStore.name}
			</Tag>
		</Link>
	);
}
