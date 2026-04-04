import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { getRealSteps } from "@/components/dag-visualizer/node-types";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { prepareBackendTimestamp, secondsToTimeString } from "@/lib/dates";
import { RawStepNode } from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { type Components, Virtuoso } from "react-virtuoso";
import { useSelectedStep } from "../use-selected-step";
import { PipelineRunLogSidebarEmptyState, PipelineRunLogSidebarItem } from "./common";
import { StatusFilter } from "./common-types";

type Props = {
	searchTerm: string;
	statusFilter: StatusFilter;
};

export function PipelineRunLogsSidebarStepList({ searchTerm, statusFilter }: Props) {
	const params = useParams() as { runId: string };
	const { runId } = params;
	const dagQuery = usePipelineRunDag(
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

	if (dagQuery.isPending) {
		return (
			<div className="space-y-2 px-3">
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
		);
	}

	if (dagQuery.isError) {
		return <div>Error loading DAG</div>;
	}

	const dag = dagQuery.data;
	const realSteps = getRealSteps(dag.nodes).sort((a, b) => {
		const aTime = a.metadata.start_time
			? prepareBackendTimestamp(a.metadata.start_time)
			: undefined;
		const bTime = b.metadata.start_time
			? prepareBackendTimestamp(b.metadata.start_time)
			: undefined;
		if (!aTime && !bTime) return 0;
		if (!aTime) return 1;
		if (!bTime) return -1;
		return aTime.getTime() - bTime.getTime();
	});

	if (realSteps.length === 0) {
		return <PipelineRunLogSidebarEmptyState message="No steps found." />;
	}

	const filteredSteps = realSteps
		.filter((step) => step.name.toLowerCase().includes(searchTerm.toLowerCase()))
		.filter((step) => statusFilter === "all" || step.metadata.status === statusFilter);

	if (filteredSteps.length === 0) {
		return <PipelineRunLogSidebarEmptyState message="No steps match your filters." />;
	}

	return <PipelineRunLogsSidebarStepVirtualizedList steps={filteredSteps} runStatus={dag.status} />;
}

function PipelineRunLogsSidebarStepVirtualizedList({
	steps,
	runStatus
}: {
	steps: RawStepNode[];
	runStatus: ExecutionStatus;
}) {
	const selectedStepId = useSelectedStep();

	return (
		<div className="flex-1 overflow-auto">
			<Virtuoso
				components={{
					List
				}}
				minOverscanItemCount={8}
				data={steps}
				itemContent={(_, step) => {
					const isActive = selectedStepId === step.id;
					const isStatusUnknown = getIsStatusUnknown(step.metadata.status, runStatus);
					const duration =
						step.metadata.duration !== undefined && step.metadata.duration !== null
							? secondsToTimeString(step.metadata.duration)
							: null;

					return (
						<div>
							<Link to={`?step=${step.id}`}>
								<PipelineRunLogSidebarItem
									duration={duration}
									icon={
										<ExecutionStatusIcon
											className="size-4 shrink-0"
											status={isStatusUnknown ? "unknown" : step.metadata.status}
										/>
									}
									title={step.name}
									isActive={isActive}
								/>
							</Link>
						</div>
					);
				}}
			/>
		</div>
	);
}

const List: Components["List"] = React.forwardRef(({ style, children, ...props }, ref) => {
	return (
		<div style={style} ref={ref} className="space-y-1 px-3 pb-5" {...props}>
			{children}
		</div>
	);
});
