import AlertCircle from "@/assets/icons/alert-circle.svg?react";
import { ArtifactNode } from "@/components/dag-visualizer/ArtifactNode";
import { DagControls } from "@/components/dag-visualizer/Controls";
import { ElkEdge } from "@/components/dag-visualizer/elk-edge";
import { PreviewArtifactNode } from "@/components/dag-visualizer/PreviewArtifact";
import { PreviewStepNode } from "@/components/dag-visualizer/PreviewStep";
import { StepNode } from "@/components/dag-visualizer/StepNode";
import { EmptyState } from "@/components/EmptyState";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import { useMemo } from "react";
import ReactFlow, { NodeTypes } from "reactflow";
import { useDag } from "./useDag";

const customEdge = {
	elk: ElkEdge
};

const customNodes: NodeTypes = {
	step: StepNode,
	artifact: ArtifactNode,
	previewStep: PreviewStepNode,
	previewArtifact: PreviewArtifactNode
};

export function DAG() {
	const {
		dagQuery,
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		initialRender,
		topMostNode,
		shouldFitView
	} = useDag();

	// Memoize refetch function to prevent DagControls re-render
	const handleRefetch = useMemo(() => {
		return () => dagQuery.refetch();
	}, [dagQuery]);

	if (dagQuery.isError) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">There was an error loading the DAG visualization.</p>
			</EmptyState>
		);
	}

	if (
		dagQuery.isPending ||
		dagQuery.isLoading ||
		(!dagQuery.data && !dagQuery.isError) ||
		initialRender
	)
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Loading DAG Visualization</p>
				</div>
			</div>
		);

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
			onlyRenderVisibleElements
			multiSelectionKeyCode={null}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			fitView
			fitViewOptions={
				shouldFitView
					? undefined
					: topMostNode
						? {
								nodes: [topMostNode],
								maxZoom: 1.2
							}
						: undefined
			}
		>
			<DagControls refetch={handleRefetch} />
		</ReactFlow>
	);
}
