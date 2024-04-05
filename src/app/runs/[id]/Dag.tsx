import { usePipelineRunGraph } from "@/data/pipeline-runs/pipeline-run-graph-query";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
	NodeTypes,
	useEdgesState,
	useNodesState,
	useReactFlow,
	useStore
} from "reactflow";
import { getLayoutedNodes } from "@/components/dag-visualizer/layout";
import { StepNode } from "@/components/dag-visualizer/StepNode";
import { ArtifactNode } from "@/components/dag-visualizer/ArtifactNode";
import { SmoothStepSmart } from "@/components/dag-visualizer/SmartEdge";
import { Spinner } from "@zenml-io/react-component-library";

const customNodes: NodeTypes = {
	step: StepNode,
	artifact: ArtifactNode
};

const customEdge = {
	smart: SmoothStepSmart
};

export function DAG() {
	const { runId } = useParams() as { runId: string };
	const { data, isPending, isError } = usePipelineRunGraph({ runId });

	const { fitView } = useReactFlow();
	const { width, height } = useStore((state) => ({ width: state.width, height: state.height }));

	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const onDagreLayout = useCallback(() => {
		const layouted = getLayoutedNodes(data?.nodes, data?.edges);

		setNodes([...layouted.nodes]);
		setEdges([...layouted.edges]);

		window.requestAnimationFrame(() => {
			fitView();
		});
	}, [data?.nodes, data?.edges]);

	useEffect(() => {
		fitView(); // Keep an eye on performance here
	}, [width, height]);

	useLayoutEffect(() => {
		onDagreLayout();
	}, [data?.nodes, data?.edges, onDagreLayout]);

	if (isError) return null;

	if (isPending) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading DAG Visualization</p>
				</div>
			</div>
		);
	}

	return (
		<ReactFlow
			minZoom={-2}
			connectOnClick={false}
			nodesDraggable={false}
			nodesConnectable={false}
			edgeTypes={customEdge}
			nodeTypes={customNodes}
			nodes={nodes}
			edges={edges}
			edgesFocusable={false}
			multiSelectionKeyCode={null}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			fitView
		/>
	);
}
