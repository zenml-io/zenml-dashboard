import { formatRunName } from "@/components/runs/runs";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { calculateTimeDifference } from "@/lib/dates";
import { Skeleton } from "@zenml-io/react-component-library";
import { useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelectedStep } from "../use-selected-step";
import { PipelineRunLogSidebarItem } from "./common";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { RunName } from "@/components/runs/run-name";

export function PipelineRunLogsSidebarRunItem() {
	const params = useParams() as { runId: string };
	const { runId } = params;
	const selectedStepId = useSelectedStep();
	const pathname = useLocation().pathname;
	const runQuery = usePipelineRun({ runId });

	const formattedRunName = useMemo(
		() => (runQuery.data ? formatRunName(runQuery.data.name, runQuery.data.body?.index) : ""),
		[runQuery.data]
	);

	if (runQuery.isPending) {
		return <Skeleton className="h-6 w-full" />;
	}

	if (runQuery.isError) {
		return <div className="px-3 py-2 text-text-xs text-theme-text-error">Error loading run</div>;
	}

	const run = runQuery.data;

	const duration =
		run?.metadata?.start_time && run?.metadata?.end_time
			? calculateTimeDifference(run?.metadata?.start_time, run?.metadata?.end_time)
			: null;

	return (
		<Link to={pathname}>
			<PipelineRunLogSidebarItem
				duration={duration}
				tooltip={formattedRunName}
				icon={<ExecutionStatusIcon status={run.body?.status} className="size-4 flex-shrink-0" />}
				title={<RunName name={run.name} index={run.body?.index} />}
				isActive={selectedStepId === null}
			/>
		</Link>
	);
}
