import { CollapsibleCard } from "@/components/CollapsibleCard";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Skeleton } from "@zenml-io/react-component-library";
import { CATEGORY_CONFIG, ProgressCategory, computeStepCounts } from "./progress-config";
import { SegmentedProgressBar } from "./segmented-progress-bar";

type Props = {
	runId: string;
};

export function ProgressCollapsible({ runId }: Props) {
	const { data: dag, isPending } = usePipelineRunDag({ runId });

	if (isPending) return <Skeleton className="h-[120px] w-full" />;
	if (!dag) return null;

	const counts = computeStepCounts(dag.nodes);
	const total = Object.values(counts).reduce((sum, c) => sum + c, 0);

	return <ProgressContent counts={counts} total={total} />;
}

type ProgressContentProps = {
	counts: Record<ProgressCategory, number>;
	total: number;
};

function ProgressContent({ counts, total }: ProgressContentProps) {
	return (
		<CollapsibleCard initialOpen title="Progress">
			<SegmentedProgressBar counts={counts} />
			<div className="mt-3 flex flex-wrap items-start gap-5">
				<div className="flex flex-col gap-1 border-r border-theme-border-moderate pr-5">
					<span className="text-text-sm text-theme-text-secondary">Total Steps</span>
					<span className="text-text-xl font-semibold">{total}</span>
				</div>
				{CATEGORY_CONFIG.map((cat) => (
					<StatusStatItem
						key={cat.key}
						label={cat.label}
						count={counts[cat.key]}
						representativeStatus={cat.representativeStatus}
					/>
				))}
			</div>
		</CollapsibleCard>
	);
}

type StatusStatItemProps = {
	label: string;
	count: number;
	representativeStatus: ExecutionStatus;
};

function StatusStatItem({ label, count, representativeStatus }: StatusStatItemProps) {
	return (
		<div className="flex flex-col gap-1">
			<span className="text-text-sm text-theme-text-secondary">{label}</span>
			<div className="flex items-center gap-1">
				<ExecutionStatusIcon status={representativeStatus} />
				<span className="text-text-xl font-semibold">{count}</span>
			</div>
		</div>
	);
}
