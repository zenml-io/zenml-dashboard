import { Node, RawArtifactNode, RawStepNode } from "@/types/dag-visualizer";

export function isStepNode(node: Node) {
	return node.type === "step";
}

export function isArtifactNode(node: Node) {
	return node.type === "artifact";
}

export function isPreviewNode(node: Node) {
	return !node.id;
}

export function getRealSteps(nodes: Node[]): RawStepNode[] {
	return nodes.filter(isStepNode).filter((n) => !isPreviewNode(n)) as RawStepNode[];
}

export function getRealArtifacts(nodes: Node[]): RawArtifactNode[] {
	return nodes.filter(isArtifactNode).filter((n) => !isPreviewNode(n)) as RawArtifactNode[];
}

export function getPreviewNodes(nodes: Node[]) {
	return nodes.filter(isPreviewNode);
}

export function getPreviewSteps(nodes: Node[]) {
	return nodes.filter(isPreviewNode).filter(isStepNode);
}
