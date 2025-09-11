import { getLayoutedItems } from "@/components/dag-visualizer/layout";
import { computeNodes } from "@/components/dag-visualizer/layout/compute";
import { Dag } from "@/types/dag-visualizer";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { useEdgesState, useNodesState, Node } from "reactflow";

export function useDag(dag: Dag) {
	const [initialRender, setInitialRender] = useState(true);
	const [topMostNode, setTopMostNode] = useState<Node | null>(null);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const computedNodes = useMemo(() => computeNodes(dag.nodes, dag.status), [dag.nodes, dag.status]);
	const dagEdges = useMemo(() => dag.edges, [dag.edges]);

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
