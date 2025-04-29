import { NestedCollapsible } from "@/components/NestedCollapsible";
import { usePipelineBuild } from "@/data/pipeline-builds/all-pipeline-builds-query";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { BuildItem, BuildItemMap } from "@/types/pipeline-builds";
import { Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { CodeCollapsible } from "./CodeCollapsible";
import { DockerImageCollapsible } from "./DockerImageCollapsible";
import { EnvironmentCollapsible } from "./EnvironmentCollapsible";
import { PipelineParamsCollapsible } from "./ParameterCollapsible";

export function ConfigurationTab() {
	const { runId } = useParams() as { runId: string };
	const { data, isError, isPending } = usePipelineRun(
		{ runId: runId, queryParams: { include_python_packages: true } },
		{ throwOnError: true }
	);
	const { data: buildData } = usePipelineBuild(
		{
			buildId: data?.body?.build?.id as string
		},
		{ enabled: !!data?.body?.build?.id }
	);

	if (isError) return null;
	if (isPending)
		return (
			<div className="space-y-5">
				<Skeleton className="h-[56px] w-full" />
				<Skeleton className="h-[56px] w-full" />
				<Skeleton className="h-[56px] w-full" />
				<Skeleton className="h-[56px] w-full" />
			</div>
		);

	return (
		<div className="grid grid-cols-1 gap-5">
			<PipelineParamsCollapsible deploymentId={data.body?.deployment_id ?? undefined} />
			{(buildData?.metadata?.images as BuildItemMap)?.orchestrator && (
				<DockerImageCollapsible data={buildData?.metadata?.images?.orchestrator as BuildItem} />
			)}
			<CodeCollapsible runId={runId} />
			<EnvironmentCollapsible run={data} />
			<NestedCollapsible
				isInitialOpen
				title="Resources"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				data={(data.metadata?.config.settings as { [key: string]: any })?.resources || {}}
			/>
			<NestedCollapsible
				isInitialOpen
				title="Substitutions"
				data={data.metadata?.config.substitutions}
			/>
			<NestedCollapsible isInitialOpen title="Extra" data={data.metadata?.config.extra} />
		</div>
	);
}
