import { getLayoutedItems } from "@/components/dag-visualizer/layout";
import { computeNodes } from "@/components/dag-visualizer/layout/compute";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { useEdgesState, useNodesState, useReactFlow, useStore } from "reactflow";

export function useDag() {
	const { runId } = useParams() as { runId: string };
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

	// reactflow specific
	const { fitView } = useReactFlow();
	const { width, height } = useStore((state) => ({ width: state.width, height: state.height }));

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	// calculationLogic

	const calcDagLayout = useCallback(() => {
		if (!dagQuery.data) return;
		const nodes = computeNodes(dagQuery.data.nodes, dagQuery.data.status);
		const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedItems(
			nodes,
			dagQuery.data.edges
		);
		setNodes(layoutedNodes);
		setEdges(layoutedEdges);
	}, [dagQuery.data, setNodes, setEdges]);

	useEffect(() => {
		fitView(); // Keep an eye on performance here
	}, [width, height, fitView]);

	useLayoutEffect(() => {
		calcDagLayout();
	}, [calcDagLayout]);

	return { dagQuery, nodes, edges, onNodesChange, onEdgesChange };
}
