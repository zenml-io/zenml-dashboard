import { CodeCollapsible } from "./CodeCollapsible";
import { EnvironmentCollapsible } from "./EnvironmentCollapsible";
import { useParams } from "react-router-dom";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { NestedCollapsible } from "@/components/NestedCollapsible";

export function ConfigurationTab() {
	const { runId } = useParams() as { runId: string };
	const { data, isError, isPending } = usePipelineRun({ runId: runId }, { throwOnError: true });
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
			<CodeCollapsible runId={runId} />
			<EnvironmentCollapsible run={data} />
			<NestedCollapsible title="Extra" data={data.metadata?.config.extra} />
			<NestedCollapsible
				title="Resources"
				data={(data.metadata?.config.settings as { [key: string]: any })?.resources || {}}
			/>
		</div>
	);
}
