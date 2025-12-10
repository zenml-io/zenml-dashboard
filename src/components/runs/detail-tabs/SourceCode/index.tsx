import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { Codesnippet } from "@/components/CodeSnippet";
import { CollapsibleCard } from "@/components/CollapsibleCard";
import { EmptyState } from "@/components/EmptyState";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { pipelineSnapshotQueries } from "@/data/pipeline-snapshots";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@zenml-io/react-component-library";

type Props = {
	runId: string;
};

function SourceCodeEmptyState({ title, description }: { title: string; description: string }) {
	return (
		<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
			<div className="text-center">
				<p className="text-display-xs font-semibold">{title}</p>
				<p className="text-text-lg text-theme-text-secondary">{description}</p>
			</div>
		</EmptyState>
	);
}

export function SourceCodeTab({ runId }: Props) {
	const {
		data: run,
		isPending: isRunPending,
		isError: isRunError
	} = usePipelineRun({
		runId
	});

	const snapshotId = run?.resources?.snapshot?.id;

	const {
		data: snapshot,
		isPending: isSnapshotPending,
		isError: isSnapshotError
	} = useQuery({
		...pipelineSnapshotQueries.detail(snapshotId!),
		enabled: !!snapshotId
	});

	if (isRunError) {
		return (
			<SourceCodeEmptyState title="Error Loading Run" description="Failed to load run details." />
		);
	}

	if (isSnapshotError) {
		return (
			<SourceCodeEmptyState
				title="Error Loading Snapshot"
				description="Failed to load snapshot details."
			/>
		);
	}

	if (isRunPending || isSnapshotPending) return <Skeleton className="h-[250px] w-full" />;

	if (!snapshotId) {
		return (
			<SourceCodeEmptyState
				title="No Snapshot"
				description="There is no snapshot associated with this run."
			/>
		);
	}

	const sourceCode = snapshot.metadata?.source_code;

	if (!sourceCode) {
		return (
			<SourceCodeEmptyState
				title="No Source Code"
				description="There is no source code available to display for this pipeline."
			/>
		);
	}

	return (
		<div className="flex flex-col gap-5">
			<CollapsibleCard initialOpen title="Pipeline Code">
				<Codesnippet fullWidth highlightCode wrap language="python" code={sourceCode} />
			</CollapsibleCard>
		</div>
	);
}
