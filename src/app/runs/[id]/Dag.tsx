import AlertCircle from "@/assets/icons/alert-circle.svg?react";

import { ArtifactNode } from "@/components/dag-visualizer/ArtifactNode";
import { DagControls } from "@/components/dag-visualizer/Controls";
import { PreviewArtifactNode } from "@/components/dag-visualizer/PreviewArtifact";
import { PreviewStepNode } from "@/components/dag-visualizer/PreviewStep";
import { SmoothStepSmart } from "@/components/dag-visualizer/SmartEdge";
import { StepNode } from "@/components/dag-visualizer/StepNode";
import { EmptyState } from "@/components/EmptyState";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import ReactFlow, { NodeTypes } from "reactflow";
import { useDag } from "./useDag";

const customNodes: NodeTypes = {
	step: StepNode,
	artifact: ArtifactNode,
	previewStep: PreviewStepNode,
	previewArtifact: PreviewArtifactNode
};

const customEdge = {
	smart: SmoothStepSmart
};

export function DAG() {
	const { pipelineDeployment, pipelineRun, nodes, edges, onEdgesChange, onNodesChange } = useDag();

	if (pipelineRun.isError || pipelineDeployment.isError) {
		return (
			<EmptyState icon={<AlertCircle className="h-[120px] w-[120px] fill-neutral-300" />}>
				<p className="text-center">There was an error loading the DAG visualization.</p>
			</EmptyState>
		);
	}

	if (pipelineRun.isPending || pipelineDeployment.isPending) {
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
		>
			<DagControls
				refetch={() => {
					pipelineRun.refetch();
					pipelineDeployment.refetch();
				}}
			/>
		</ReactFlow>
	);
}
