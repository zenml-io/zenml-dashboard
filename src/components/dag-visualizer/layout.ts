import {
	IntermediateArtifactNode,
	IntermediatePreviewNode,
	IntermediateStepNode,
	Edge
} from "@/types/dag-visualizer";
import Dagre from "@dagrejs/dagre";
import { Edge as ReactFlowEdge, Node as ReactFlowNode } from "reactflow";

const nodeWidth = 300;
const artifactHeight = 50;
const stepHeight = 70;

export function getLayoutedItems(
	nodes: (IntermediateStepNode | IntermediateArtifactNode | IntermediatePreviewNode)[],
	edges: Edge[]
): { nodes: ReactFlowNode[]; edges: ReactFlowEdge[] } {
	const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	g.setGraph({ rankdir: "TB", ranksep: 50, nodesep: 10 });
	if (!nodes || !edges) return { nodes: [], edges: [] };
	if (nodes.length < 1) return { nodes: [], edges: [] };

	edges.forEach((edge) => {
		g.setEdge(edge.source, edge.target);
	});
	nodes.forEach((node) => {
		g.setNode(node.id, {
			width: nodeWidth,
			height: node.type === "step" ? stepHeight : artifactHeight
		});
	});

	Dagre.layout(g);

	return {
		nodes: nodes.map((node) => {
			const { x, y } = g.node(node.id);
			return { ...node, position: { x, y } };
		}),
		edges: deduplicateEdges(edges, nodes.length)
	};
}

function deduplicateEdges(edges: Edge[], nodesCount: number): ReactFlowEdge[] {
	const edgeMap = new Map<string, ReactFlowEdge>();
	const edgeType = nodesCount > 30 ? "smoothstep" : "smart";

	for (const edge of edges) {
		const id = `${edge.source}-${edge.target}`;
		if (!edgeMap.has(id)) {
			edgeMap.set(id, {
				id,
				source: edge.source,
				target: edge.target,
				type: edgeType
			});
		}
	}

	return Array.from(edgeMap.values());
}
