import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { EmptyState } from "@/components/EmptyState";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import { DAG } from "./dag";
import { TimelineView } from "./timeline";
import { useRunVisualization } from "./use-visualization";

import dummy from "../../../../../dummy.json";

type Props = {
	runId: string;
};

export function PipelineVisualization({ runId }: Props) {
	const { dagQuery, activeView, setActiveView } = useRunVisualization(runId);

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

	if (activeView === "dag") {
		return (
			<DAG
				dagData={dummy as any}
				refetchHandler={() => dagQuery.refetch()}
				setActiveView={setActiveView}
			/>
		);
	}

	if (activeView === "timeline") {
		return <TimelineView dagData={dummy as any} setActiveView={setActiveView} />;
	}
}
