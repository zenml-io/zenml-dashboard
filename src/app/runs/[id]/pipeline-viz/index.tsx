import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import { DAG } from "./dag";
import { DagViewConfirmationDialog } from "./DagViewConfirmationDialog";
import { TimelineView } from "./timeline/timeline-view";
import { useRunVisualization } from "./use-visualization";

type Props = {
	runId: string;
};

export function PipelineVisualization({ runId }: Props) {
	const {
		dagQuery,
		activeView,
		setActiveView,
		showDagConfirmation,
		setShowDagConfirmation,
		confirmDagView,
		nodeCount,
		threshold
	} = useRunVisualization(runId);

	if (dagQuery.isError) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">There was an error loading the DAG visualization.</p>
			</EmptyState>
		);
	}

	if (dagQuery.isPending)
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading Run Visualization</p>
				</div>
			</div>
		);

	const dagData = dagQuery.data;

	if (activeView === "dag") {
		return (
			<DAG
				dagData={dagData}
				refetchHandler={() => dagQuery.refetch()}
				setActiveView={setActiveView}
			/>
		);
	}

	if (activeView === "timeline") {
		return (
			<>
				<TimelineView
					dagData={dagData}
					setActiveView={setActiveView}
					refetchHandler={() => dagQuery.refetch()}
				/>
				<DagViewConfirmationDialog
					open={showDagConfirmation}
					onOpenChange={setShowDagConfirmation}
					nodeCount={nodeCount}
					threshold={threshold}
					onConfirm={confirmDagView}
				/>
			</>
		);
	}
}
