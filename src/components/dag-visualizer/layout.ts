import {
	IntermediateArtifactNode,
	IntermediatePreviewNode,
	IntermediateStepNode,
	Edge
} from "@/types/dag-visualizer";
import { Edge as ReactFlowEdge, Node as ReactFlowNode } from "reactflow";
import ELK, { ElkExtendedEdge } from "elkjs/lib/elk-api";
import worker from "elkjs/lib/elk-worker.min?url";

const nodeWidth = 300;
const artifactHeight = 50;
const stepHeight = 70;

const elk = new ELK({
	workerUrl: worker
});
export async function getLayoutedItems(
	nodes: (IntermediateStepNode | IntermediateArtifactNode | IntermediatePreviewNode)[],
	edges: Edge[]
): Promise<{ nodes: ReactFlowNode[]; edges: ReactFlowEdge[] }> {
	if (!nodes || !edges || nodes.length < 1) return { nodes: [], edges: [] };

	const normalizedNodes = nodes
		.map((node) => ({
			id: node.id,
			width: nodeWidth,
			height: node.type === "step" || node.type === "previewStep" ? stepHeight : artifactHeight
		}))
		.sort((a, b) => a.id.localeCompare(b.id));

	const normalizedEdges = edges
		.map((edge) => ({
			id: getEdgeId(edge),
			sources: [edge.source],
			targets: [edge.target]
		}))
		.sort((a, b) => a.id.localeCompare(b.id));

	// Build ELK graph structure
	const elkGraph = {
		id: "root",
		layoutOptions: {
			"elk.algorithm": "layered",
			"elk.direction": "DOWN",
			"elk.layered.alignSiblings": "true",
			"elk.spacing.nodeNode": "25",
			"elk.layered.spacing.nodeNodeBetweenLayers": "60",
			"elk.layered.spacing.edgeNodeBetweenLayers": "40",
			"elk.layered.spacing.edgeEdgeBetweenLayers": "20",
			"elk.layered.nodePlacement.strategy": "BRANDES_KOEPF",
			"elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
			"elk.layered.edgeRouting": "POLYLINE",
			"elk.layered.nodePlacement.bk.fixedAlignment": "BALANCED",
			"elk.layered.mergeEdges": "true",
			"elk.layered.considerModelOrder.strategy": "PREFER_INPUT",
			"elk.edgeRouting": "ORTHOGONAL",
			"elk.separateConnectedComponents": "false"
		},
		children: normalizedNodes,
		edges: normalizedEdges
	};

	// Compute layout
	const layout = await elk.layout(elkGraph);

	// Attach computed x/y back to your React Flow nodes
	const positionedNodes: ReactFlowNode[] = nodes.map((node) => {
		const layoutNode = layout.children?.find((n) => n.id === node.id);
		return {
			...node,
			position: {
				x: layoutNode?.x ?? 0,
				y: layoutNode?.y ?? 0
			}
		};
	});

	return {
		nodes: positionedNodes,
		edges: deduplicateEdges(getElkEdge(layout.edges))
	};
}

function deduplicateEdges(edges: ReactFlowEdge[]): ReactFlowEdge[] {
	const edgeMap = new Map<string, ReactFlowEdge>();

	for (const edge of edges) {
		const id = edge.id;

		if (!edgeMap.has(id)) {
			edgeMap.set(id, {
				...edge,
				style: { strokeWidth: 2 }
			});
		}
	}

	return Array.from(edgeMap.values());
}

function getElkEdge(elkEdges: ElkExtendedEdge[]): ReactFlowEdge[] {
	return elkEdges.map((edge) => {
		const flowEdge: ReactFlowEdge = {
			id: edge.id,
			source: edge.sources[0],
			target: edge.targets[0],
			type: "smoothstep"
		};

		if (edge.sections && edge.sections.length > 0) {
			const section = edge.sections[0];

			// Create an array of points for the path
			// Starting with the start point
			const points = [{ x: section.startPoint.x, y: section.startPoint.y }];

			// Add all bendpoints if present
			if (section.bendPoints) {
				section.bendPoints.forEach((bendPoint) => {
					points.push({ x: bendPoint.x, y: bendPoint.y });
				});
			}

			// Add end point
			points.push({ x: section.endPoint.x, y: section.endPoint.y });

			// Set edge type to 'elk' and add routing points
			flowEdge.type = "elk";
			flowEdge.data = {
				// These points are used by a custom edge type
				points: points
			};
		}

		return flowEdge;
	});
}

function getEdgeId(edge: Edge) {
	return `${edge.source}-${edge.target}`;
}
