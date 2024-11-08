import { getLayoutedNodes } from "@/components/dag-visualizer/layout";
import { mergeRealAndPlacehodlerData } from "@/components/dag-visualizer/layout/helper";
import { extractPlaceholderLayout } from "@/components/dag-visualizer/layout/placeholder";
import { extractExistingNodes } from "@/components/dag-visualizer/layout/real-data";
import { pipelineDeploymentQueries } from "@/data/pipeline-deployments";
import { usePipelineRun } from "@/data/pipeline-runs/pipeline-run-detail-query";
import { StepOutput } from "@/types/pipeline-deployments";
import { StepDict } from "@/types/steps";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useEdgesState, useNodesState, useReactFlow, useStore } from "reactflow";

export function useDag() {
	const { runId } = useParams() as { runId: string };
	const pipelineRun = usePipelineRun(
		{ runId: runId },
		{
			refetchInterval: (e) => (e.state.data?.body?.status === "running" ? 3000 : false)
		}
	);
	const pipelineDeployment = useQuery({
		...pipelineDeploymentQueries.detail(pipelineRun.data?.body?.deployment_id || ""),
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

		const { nodes, edges } = mergeRealAndPlacehodlerData({
			placeholderEdges: placeholderData.edges,
			placeHolderArtifacts: placeholderData.artifacts,
			placeHolderSteps: placeholderData.steps,
			realEdges: realNodes.edges,
			realArtifacts: realNodes.nodes.artifactNodes,
			realSteps: realNodes.nodes.steps,
			runStatus: pipelineRun.data?.body?.status ?? "running"
		});

		const layouted = getLayoutedNodes(nodes, edges);

		setNodes([...layouted.nodes]);
		setEdges([...layouted.edges]);

		window.requestAnimationFrame(() => {
			fitView();
		});
	}, [fitView, setNodes, setEdges, placeholderData, realNodes, pipelineRun.data]);

	useEffect(() => {
		fitView(); // Keep an eye on performance here
	}, [width, height, fitView]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			fitView({ duration: 200 });
		}, 100);
		return () => {
			clearTimeout(timeout);
		};
	}, [pipelineDeployment.data, pipelineRun.data, fitView]);

	useLayoutEffect(() => {
		onDagreLayout();
	}, [onDagreLayout]);

	return { pipelineRun, pipelineDeployment, nodes, edges, onNodesChange, onEdgesChange };
}
