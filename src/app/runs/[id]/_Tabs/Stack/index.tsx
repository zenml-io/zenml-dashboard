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

	return <StackTabContent run={run.data} stackId={stackId!} />;
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
