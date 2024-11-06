import { ZenEdge, ZenNode } from "@/types/pipeline-runs";
import Dagre from "@dagrejs/dagre";
import { Edge, Node } from "reactflow";

const nodeWidth = 300;
const artifactHeight = 50;
const stepHeight = 70;

export function getLayoutedNodes(
	nodes?: ZenNode[],
	edges?: ZenEdge[]
): { nodes: Node[]; edges: Edge[] } {
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
		edges: edges.map((edge) => {
			return {
				...edge,
				type: nodes.length > 30 ? "smoothstep" : "smart"
			};
		})
	};
}
