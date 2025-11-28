import RunIcon from "@/assets/icons/terminal.svg?react";
import { ArtifactNode } from "@/components/dag-visualizer/ArtifactNode";
import { DagControls } from "@/components/dag-visualizer/Controls";
import { ElkEdge } from "@/components/dag-visualizer/elk-edge";
import { GlobalSheets } from "@/components/dag-visualizer/global-sheets";
import { PreviewArtifactNode } from "@/components/dag-visualizer/PreviewArtifact";
import { PreviewStepNode } from "@/components/dag-visualizer/PreviewStep";
import { SheetProvider } from "@/components/dag-visualizer/sheet-context";
import { StepNode } from "@/components/dag-visualizer/StepNode";
import { TriggeredRunNode } from "@/components/dag-visualizer/TriggeredRunNode";
import { EmptyState } from "@/components/EmptyState";
import { Dag } from "@/types/dag-visualizer";
import { Spinner } from "@zenml-io/react-component-library/components/server";
import ReactFlow, { NodeTypes } from "reactflow";
import { PiplineRunVisualizationView } from "../types";
import { ViewSwitcher } from "../view-switcher";
import { useDag } from "./useDag";

type Props = {
	dagData: Dag;
	refetchHandler: () => void;
	setActiveView?: (view: PiplineRunVisualizationView) => void;
};

const customEdge = {
	elk: ElkEdge
};

const customNodes: NodeTypes = {
	step: StepNode,
	artifact: ArtifactNode,
	previewStep: PreviewStepNode,
	previewArtifact: PreviewArtifactNode,
	triggered_run: TriggeredRunNode
};

export function DAG({ dagData, refetchHandler, setActiveView }: Props) {
	const { nodes, edges, onNodesChange, onEdgesChange, initialRender, topMostNode, shouldFitView } =
		useDag(dagData);

	if (dagData.nodes.length === 0) {
		return (
			<EmptyState icon={<RunIcon className="h-[120px] w-[120px] fill-neutral-300" />}>
				<div className="space-y-2 text-center">
					<p className="text-display-xs font-semibold">No steps to display</p>
					<p className="text-base text-neutral-500">There are no steps to display for this run.</p>
				</div>
			</EmptyState>
		);
	}

	if (initialRender)
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<Spinner />
				<div className="mt-4 flex flex-col items-center">
					<p className="mb-5 text-display-xs">Calculating DAG Visualization</p>
				</div>
			</div>
		);

	return (
		<SheetProvider>
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
				<DagControls
					refetch={refetchHandler}
					viewSwitcher={
						setActiveView ? <ViewSwitcher activeView={"dag"} setActiveView={setActiveView} /> : null
					}
				/>
			</ReactFlow>
			<GlobalSheets />
		</SheetProvider>
	);
}
