import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { StopRunButton } from "./stop-button";
import { RunStopDropdown } from "./stop-dropdown";
type Props = {
	runId: string;
};

export function RunStopGroup({ runId }: Props) {
	const runQuery = usePipelineRun({ runId });

	if (runQuery.isError) return null;
	if (runQuery.isPending) return <Skeleton className="h-6 w-[100px]" />;

	const status = runQuery.data?.body?.status;
	const isActive = status === "running" || status === "initializing";

	return (
		<div className="flex">
			<StopRunButton runId={runId} isActive={isActive} />
			<RunStopDropdown runId={runId} isActive={isActive} />
		</div>
	);
}
