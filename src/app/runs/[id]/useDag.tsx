import {
	extractExistingNodes,
	extractPlaceholderLayout,
	StepDict
} from "@/components/dag-visualizer/extract-layout";

import { useQuery } from "@tanstack/react-query";

import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Edge, useEdgesState, useNodesState, useReactFlow, useStore } from "reactflow";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { pipelineDeploymentQueries } from "@/data/pipeline-deployments";
import { StepOutput } from "@/types/pipeline-deployments";
import { getLayoutedNodes } from "@/components/dag-visualizer/layout";

export function useDag() {
	const { runId } = useParams() as { runId: string };
	const pipelineRun = usePipelineRun(
		{ runId: runId },
		{
			refetchInterval: (e) => (e.state.data?.body?.status === "running" ? 3000 : false)
		}
	);
	const pipelineDeployment = useQuery({
		...pipelineDeploymentQueries.detail(pipelineRun.data?.body?.deployment_id!),
		enabled: !!pipelineRun.data?.body?.deployment_id
	});

	const { fitView } = useReactFlow();
	const { width, height } = useStore((state) => ({ width: state.width, height: state.height }));

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const placeholderData = useMemo(() => {
		return extractPlaceholderLayout(
			(pipelineDeployment.data?.metadata?.step_configurations as Record<string, StepOutput>) ?? {}
		);
	}, [pipelineDeployment.data?.metadata?.step_configurations]);

	const realNodes = useMemo(() => {
		return extractExistingNodes((pipelineRun.data?.metadata?.steps as StepDict) ?? {});
	}, [pipelineRun.data?.metadata?.steps]);

	const onDagreLayout = useCallback(() => {
		// replayed layouted with nodes from readNodes, in case the id is the same
		const nodes = placeholderData.nodes.map((node) => {
			const realNode = realNodes.find((n) => n.id === node.id);
			if (realNode) {
				return { ...node, ...realNode };
			}
			return {
				...node,
				data: { ...node.data, status: pipelineRun.data?.body?.status ?? "running" }
			};
		});

		// add a custom styling to edges that have a real node as the target
		const edges: Edge[] = placeholderData.edges.map((edge) => {
			const realNode = realNodes.find((n) => n.id === edge.target);
			return {
				...edge,
				style: { stroke: realNode ? "#9CA3AF" : "#D1D5DB", strokeWidth: 2 }
			};
		});

		const layouted = getLayoutedNodes(nodes, edges);

		setNodes([...layouted.nodes]);
		setEdges([...layouted.edges]);

		window.requestAnimationFrame(() => {
			fitView();
		});
	}, [fitView, setNodes, setEdges, placeholderData, realNodes, pipelineRun.data?.body?.status]);

	useEffect(() => {
		fitView(); // Keep an eye on performance here
	}, [width, height]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			fitView({ duration: 200 });
		}, 100);
		return () => {
			clearTimeout(timeout);
		};
	}, [pipelineDeployment.data, pipelineRun.data]);

	useLayoutEffect(() => {
		onDagreLayout();
	}, [onDagreLayout]);

	return { pipelineRun, pipelineDeployment, nodes, edges, onNodesChange, onEdgesChange };
}
