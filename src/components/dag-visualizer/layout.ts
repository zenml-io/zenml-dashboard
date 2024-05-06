import { ZenEdge, ZenNode } from "@/types/pipeline-runs";
import { Node, Edge } from "reactflow";
import Dagre from "@dagrejs/dagre";

const nodeWidth = 300;
const artifactHeight = 44;
const stepHeight = 50;

export function getLayoutedNodes(
	nodes?: ZenNode[],
	edges?: ZenEdge[]
): { nodes: Node[]; edges: Edge[] } {
	const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	g.setGraph({ rankdir: "TB", ranksep: 35, nodesep: 5 });
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
		edges: edges.map((edge) => {
			return { ...edge, type: nodes.length > 30 ? "smoothstep" : "smart" };
		})
	};
}
