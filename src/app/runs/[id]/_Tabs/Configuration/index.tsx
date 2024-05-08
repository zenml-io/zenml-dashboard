import { CodeCollapsible } from "./CodeCollapsible";
import { EnvironmentCollapsible } from "./EnvironmentCollapsible";
import { useParams } from "react-router-dom";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { NestedCollapsible } from "@/components/NestedCollapsible";
import { usePipelineBuild } from "@/data/pipeline-builds/all-pipeline-builds-query";
import { DockerImageCollapsible } from "./DockerImageCollapsible";

export function ConfigurationTab() {
	const { runId } = useParams() as { runId: string };
	const { data, isError, isPending } = usePipelineRun({ runId: runId }, { throwOnError: true });
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
			<NestedCollapsible title="Parameters" data={data.metadata?.config.parameters} />
			{buildData && <DockerImageCollapsible data={buildData?.metadata?.images?.orchestrator} />}
			<CodeCollapsible runId={runId} />
			<EnvironmentCollapsible run={data} />
			<NestedCollapsible title="Extra" data={data.metadata?.config.extra} />
			<NestedCollapsible
				title="Resources"
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				data={(data.metadata?.config.settings as { [key: string]: any })?.resources || {}}
			/>
		</div>
	);
}
