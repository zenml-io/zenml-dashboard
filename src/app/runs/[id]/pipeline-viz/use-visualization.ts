import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { PiplineRunVisualizationView } from "./types";

const NODE_COUNT_THRESHOLD = 500;

export function useRunVisualization(runId: string) {
	const [activeView, setActiveView] = useState<PiplineRunVisualizationView>("timeline");
	const previousRunStatus = useRef<ExecutionStatus | null>(null);
	const runQueryKey = useMemo(() => ["runs", runId], [runId]);
	const queryClient = useQueryClient();
	const dagQuery = usePipelineRunDag(
		{ runId },
		{
			refetchInterval: (e) =>
				e.state.data?.status === "running" || e.state.data?.status === "initializing" ? 3000 : false
		}
	);

	useEffect(() => {
		if (!dagQuery.data) return;
		const nodeCount = dagQuery.data.nodes.length;
		if (nodeCount > NODE_COUNT_THRESHOLD) {
			setActiveView("timeline");
		} else {
			setActiveView("dag");
		}
	}, [dagQuery.data]);

	useEffect(() => {
		if (dagQuery.data) {
			const currentStatus = dagQuery.data.status;
			if (previousRunStatus.current !== null && previousRunStatus.current !== currentStatus) {
				queryClient.invalidateQueries({
					queryKey: runQueryKey
				});
			}
			previousRunStatus.current = currentStatus;
		}
	}, [dagQuery.data, queryClient, runId, runQueryKey]);

	return {
		dagQuery,
		activeView,
		setActiveView
	};
}
