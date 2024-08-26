import { DockerImageCollapsible } from "@/app/runs/[id]/_Tabs/Configuration/DockerImageCollapsible";
import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { KeyValue } from "@/components/KeyValue";
import { usePipelineBuild } from "@/data/pipeline-builds/all-pipeline-builds-query";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { renderAnyToString } from "@/lib/strings";
import { AnyDict, MetadataMap } from "@/types/common";
import { BuildItemMap } from "@/types/pipeline-builds";
import { Skeleton } from "@zenml-io/react-component-library";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@zenml-io/react-component-library/components/client";
import { useParams } from "react-router-dom";
import { ErrorFallback } from "../../Error";
import { UncategorizedCard } from "../../MetadataCards";

type Props = {
	stepId: string;
};

export function StepConfigTab({ stepId }: Props) {
	const { data, isPending, isError, error } = useStepDetail({ stepId });
	const extraData = Object.values(data?.metadata?.config?.extra || {});

	const { runId } = useParams() as { runId: string };

	const { data: pipeline_run } = usePipelineRun(
		{ runId: runId },
		{ throwOnError: true, enabled: !!runId }
	);

	const { data: buildData } = usePipelineBuild(
		{
			buildId: pipeline_run?.body?.build?.id as string
		},
		{ enabled: !!pipeline_run?.body?.build?.id }
	);

	const findIndexImage = () => {
		const dockerImages = buildData?.metadata?.images;

		if (!dockerImages) {
			return null;
		}

		if (Object.keys(dockerImages).length === 1 && Object.keys(dockerImages)[0] !== "orchestrator") {
			return Object.keys(dockerImages)[0];
		}

		for (const key in dockerImages) {
			if (key !== "orchestrator" && key.split(".")[1] !== "orchestrator") {
				return key;
			}
		}

		return "orchestrator";
	};

	const indexImage = findIndexImage();

	const dataImage = indexImage && (buildData?.metadata?.images as BuildItemMap)?.[indexImage];

	if (isError) {
		return <ErrorFallback err={error} />;
	}
	if (isPending)
		return (
			<div className="space-y-5">
				<Skeleton className="h-[200]" />
				<Skeleton className="h-[200px]" />
				<Skeleton className="h-[200px]" />
			</div>
		);

	return (
		<div className="space-y-5">
			{data.metadata?.run_metadata && (
				<UncategorizedCard title="Metadata" metadata={data.metadata?.run_metadata as MetadataMap} />
			)}
			<KeyValueCard data={data.metadata?.config?.parameters as AnyDict} title="Parameters" />
			{dataImage ? <DockerImageCollapsible data={dataImage} /> : null}
			<CodeSnippetCard id={data.id} />
			{extraData.length > 0 ? <KeyValueCard data={extraData as AnyDict} title="Extra" /> : null}
		</div>
	);
}

export function KeyValueCard({ data, title }: { title: string; data: AnyDict }) {
	const hasData = Object.keys(data).length > 0;

	if (!hasData)
		return (
			<CollapsibleCard initialOpen title={title}>
				<p className="text-theme-text-secondary">No data available</p>
			</CollapsibleCard>
		);
	return (
		<CollapsibleCard initialOpen title={title}>
			<dl className="grid grid-cols-1 gap-x-[10px] gap-y-2 md:grid-cols-3 md:gap-y-4">
				{Object.entries(data).map(
					([key, value]) =>
						typeof value !== "object" && (
							<KeyValue
								key={key}
								label={
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="cursor-default truncate">
												{value.body.key}
											</TooltipTrigger>
											<TooltipContent className="max-w-[480px]">{value.body.key}</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								}
								value={<div>{renderAnyToString(value)}</div>}
							/>
						)
				)}
			</dl>
		</CollapsibleCard>
	);
}

function CodeSnippetCard({ id }: { id: string }) {
	function returnConfigSchema(id: string) {
		return `from zenml.client import Client
artifact = Client().get_pipeline_run('${id}')
config = run.config()`;
	}

	return (
		<CollapsibleCard initialOpen title="Code">
			<h2 className="mb-2  text-text-md text-theme-text-secondary">Get config programmatically</h2>
			<Codesnippet fullWidth highlightCode wrap code={returnConfigSchema(id)} />
		</CollapsibleCard>
	);
}
