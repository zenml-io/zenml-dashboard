import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { StackInfo } from "@/components/stacks/info";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStack } from "@/data/stacks/stack-detail-query";
import { PipelineRun } from "@/types/pipeline-runs";
import { Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";

export function StackTab() {
	const { runId } = useParams() as { runId: string };

	const run = usePipelineRun({ runId: runId }, { throwOnError: true });

	if (run.isPending) return <Skeleton className="h-[250px] w-full" />;
	if (run.isError) return <p>Something went wrong fetching the run</p>;

	const stackId = run.data?.body?.stack?.id;

	if (!stackId)
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="text-center">
					<p className="text-display-xs font-semibold">No Stack</p>
					<p className="text-text-lg text-theme-text-secondary">
						There is no stack associated with this run.
					</p>
				</div>
			</EmptyState>
		);

	return <StackTabContent run={run.data} stackId={stackId} />;
}

type StackTabContentProps = {
	stackId: string;
	run: PipelineRun;
};
function StackTabContent({ stackId, run }: StackTabContentProps) {
	const { data, isError, isPending } = useStack({ stackId: stackId });

	if (isPending) return <Skeleton className="h-[250px] w-full" />;

	if (isError) {
		return <p>Failed to fetch Stack</p>;
	}

	return <StackInfo stack={data} run={run} />;
}
