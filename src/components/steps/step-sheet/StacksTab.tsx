import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { StackInfoFull } from "@/components/stacks/info/stack-info-full";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { useStack } from "@/data/stacks/stack-detail-query";
import { useStepDetail } from "@/data/steps/step-detail-query";
import { Skeleton } from "@zenml-io/react-component-library";
import { useParams } from "react-router-dom";
import { EmptyState } from "../../EmptyState";

type Props = {
	stepId: string;
};
export function StackTab({ stepId }: Props) {
	const { runId } = useParams() as { runId: string };

	const run = usePipelineRun({ runId: runId });
	const step = useStepDetail({ stepId: stepId });

	if (run.isPending || step.isPending) return <Skeleton className="h-[250px] w-full" />;
	if (run.isError || step.isError) return <p>Something went wrong fetching the run</p>;

	const stackId = run.data?.resources?.stack?.id;
	const config = step.data.metadata?.config.settings || {};

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

	return <StackTabContent objectConfig={config} stackId={stackId} />;
}

type StackTabContentProps = {
	stackId: string;
	objectConfig: Record<string, unknown>;
};
function StackTabContent({ stackId, objectConfig }: StackTabContentProps) {
	const { data, isError, isPending } = useStack({ stackId: stackId });

	if (isPending) return <Skeleton className="h-[250px] w-full" />;

	if (isError) {
		return <p>Failed to fetch Stack</p>;
	}

	return <StackInfoFull stack={data} objectConfig={objectConfig} />;
}
