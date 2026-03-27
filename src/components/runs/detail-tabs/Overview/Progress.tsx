import { CollapsibleCard } from "@/components/CollapsibleCard";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { getRealSteps, getPreviewSteps } from "@/components/dag-visualizer/node-types";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Node } from "@/types/dag-visualizer";
import { Skeleton } from "@zenml-io/react-component-library";

type ProgressCategory = "completed" | "not_started" | "pending" | "running" | "failed";

type CategoryConfig = {
	key: ProgressCategory;
	label: string;
	representativeStatus: ExecutionStatus;
	bgColor: string;
};

const CATEGORY_CONFIG: CategoryConfig[] = [
	{
		key: "completed",
		label: "Completed",
		representativeStatus: "completed",
		bgColor: "bg-success-500"
	},
	{
		key: "not_started",
		label: "Not started",
		representativeStatus: "stopped",
		bgColor: "bg-neutral-400"
	},
	{
		key: "pending",
		label: "Pending",
		representativeStatus: "initializing",
		bgColor: "bg-primary-400"
	},
	{ key: "running", label: "Running", representativeStatus: "running", bgColor: "bg-warning-500" },
	{ key: "failed", label: "Failed", representativeStatus: "failed", bgColor: "bg-error-500" }
];

function categorizeStatus(status: ExecutionStatus): ProgressCategory {
	switch (status) {
		case "completed":
		case "cached":
		case "skipped":
			return "completed";
		case "initializing":
		case "provisioning":
		case "resuming":
		case "paused":
			return "pending";
		case "running":
		case "retrying":
			return "running";
		case "failed":
		case "stopped":
		case "stopping":
		case "retried":
			return "failed";
	}
}

function computeStepCounts(nodes: Node[]): Record<ProgressCategory, number> {
	const realSteps = getRealSteps(nodes);
	const previewSteps = getPreviewSteps(nodes);

	const counts: Record<ProgressCategory, number> = {
		completed: 0,
		not_started: previewSteps.length,
		pending: 0,
		running: 0,
		failed: 0
	};

	for (const step of realSteps) {
		const category = categorizeStatus(step.metadata.status);
		counts[category]++;
	}

	return counts;
}

type Props = {
	runId: string;
};

export function ProgressCollapsible({ runId }: Props) {
	const { data: dag, isPending } = usePipelineRunDag(
		{ runId },
		{
			refetchInterval: (e) =>
				e.state.data?.status === "running" ||
				e.state.data?.status === "initializing" ||
				e.state.data?.status === "provisioning" ||
				e.state.data?.status === "resuming"
					? 3000
					: false
		}
	);

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
		<CollapsibleCard
			initialOpen
			title={<span className="text-text-lg font-semibold">Progress</span>}
		>
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

type SegmentedProgressBarProps = {
	counts: Record<ProgressCategory, number>;
};

function SegmentedProgressBar({ counts }: SegmentedProgressBarProps) {
	const segments = CATEGORY_CONFIG.filter((cat) => counts[cat.key] > 0);

	if (segments.length === 0) {
		return <div className="h-2 w-full rounded-sm bg-neutral-200" />;
	}

	return (
		<div className="flex h-2 w-full overflow-hidden rounded-sm" aria-label="Step progress bar">
			{segments.map((seg) => (
				<div key={seg.key} className={seg.bgColor} style={{ flex: counts[seg.key] }} />
			))}
		</div>
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
