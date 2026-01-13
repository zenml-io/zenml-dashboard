import { getRealSteps } from "@/components/dag-visualizer/node-types";
import { prepareBackendTimestamp, secondsToTimeString } from "@/lib/dates";
import { RawStepNode } from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { Skeleton } from "@zenml-io/react-component-library/components/server";
import { Link, useParams } from "react-router-dom";
import { useSelectedStep } from "../use-selected-step";
import { useRef } from "react";
import { useVirtualizedList } from "./use-virtualized-list";
import { getIsStatusUnknown } from "@/components/dag-visualizer/layout/status";
import { PipelineRunLogSidebarEmptyState, PipelineRunLogSidebarItem } from "./common";
import { ExecutionStatusIcon } from "@/components/ExecutionStatus";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
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
				e.state.data?.status === "provisioning"
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
	const parentRef = useRef<HTMLDivElement>(null);

	// Use virtualized list hook
	const {
		virtualizer,
		virtualItems: items,
		totalSize,
		startOffset
	} = useVirtualizedList(steps, parentRef);

	return (
		<div ref={parentRef} className="flex-1 overflow-auto">
			<div
				style={{
					height: totalSize,
					width: "100%",
					position: "relative"
				}}
			>
				<div
					className="space-y-1 px-3 pb-5"
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						transform: `translateY(${startOffset}px)`
					}}
				>
					{items.map((virtualRow) => {
						const step = steps[virtualRow.index];
						const isActive = selectedStepId === step.id;
						const isStatusUnknown = getIsStatusUnknown(step.metadata.status, runStatus);
						const duration =
							step.metadata.duration !== undefined && step.metadata.duration !== null
								? secondsToTimeString(step.metadata.duration)
								: null;

						return (
							<div
								key={virtualRow.key}
								data-index={virtualRow.index}
								ref={virtualizer.measureElement}
							>
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
					})}
				</div>
			</div>
		</div>
	);
}
