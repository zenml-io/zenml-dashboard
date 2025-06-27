import { getLayoutedItems } from "@/components/dag-visualizer/layout";
import { computeNodes } from "@/components/dag-visualizer/layout/compute";
import { usePipelineRunDag } from "@/data/pipeline-runs/run-dag";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Node, useEdgesState, useNodesState } from "reactflow";

export function useDag() {
	const [initialRender, setInitialRender] = useState(true);
	const [topMostNode, setTopMostNode] = useState<Node | null>(null);
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

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const computedNodes = useMemo(() => {
		if (!dagQuery.data) return [];
		return computeNodes(dagQuery.data.nodes, dagQuery.data.status);
	}, [dagQuery.data]);

	const dagEdges = useMemo(() => {
		if (!dagQuery.data) return [];
		return dagQuery.data.edges;
	}, [dagQuery.data]);

	// calculationLogic

	const calcDagLayout = useCallback(async () => {
		if (computedNodes.length < 1) return;
		try {
			const { nodes: layoutedNodes, edges: layoutedEdges } = await getLayoutedItems(
				computedNodes,
				dagEdges
			);

			const topMostNode = layoutedNodes.reduce((min, node) => {
				if (node.position.y < min.position.y) {
					return node;
				}
				if (node.position.y === min.position.y && node.position.x < min.position.x) {
					return node;
				}
				return min;
			});
			setTopMostNode(topMostNode);
			setNodes(layoutedNodes);
			setEdges(layoutedEdges);
		} catch (error) {
			console.error("Layout calculation failed:", error);
		} finally {
			setInitialRender(false);
		}
	}, [computedNodes, dagEdges, setNodes, setEdges]);

	useLayoutEffect(() => {
		calcDagLayout();
	}, [calcDagLayout]);

	return {
		dagQuery,
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		initialRender,
		topMostNode,
		shouldFitView: shouldFitView(nodes)
	};
}

function shouldFitView(nodes: Node[]) {
	const nodeLength = nodes.length;

	// If there are no nodes or very few nodes, always fit view
	if (nodeLength === 0 || nodeLength <= 10) {
		return true;
	}

	// If there are too many nodes, don't fit view regardless of dimensions
	if (nodeLength > 40) {
		return false;
	}

	// Calculate x-axis spread of nodes
	if (nodes.length > 0) {
		const xPositions = nodes.map((node) => node.position.x);
		const minX = Math.min(...xPositions);
		const maxX = Math.max(...xPositions);
		const xSpread = maxX - minX;

		return xSpread <= 2000;
	}

	return true;
}
