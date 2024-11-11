import { ArtifactVersion } from "@/types/artifact-versions";
import { RealNode, ZenEdge, ZenNode } from "@/types/pipeline-runs";
import { StepDict } from "@/types/steps";

export function addManuallyAddedArtifacts(
	nodes: ZenNode[],
	realNodes: RealNode[],
	steps: StepDict,
	edges: ZenEdge[]
) {
	// find nodes that are in realNodes but not in nodes
	const missingNodes = findMissingNodes(realNodes, nodes);

	// check if missingNode.data.id is part of realnode.data.id already?
	missingNodes.forEach((missingNode) => {
		const [stepName, artifactName] = missingNode.id.split("--");
		const step = steps[stepName];

		if (!step) {
			return;
		}

		const existingNode = findExistingArtifactNode(nodes, missingNode);
		const inputs = step.body?.inputs as { [key: string]: ArtifactVersion };
		const outputs = step.body?.outputs as { [key: string]: ArtifactVersion };

		if (!existingNode) {
			nodes.push(missingNode);

			connectMissingNode(missingNode, stepName, artifactName, inputs, outputs, edges);
		} else {
			connectExistingNode(existingNode, stepName, artifactName, inputs, outputs, edges);
		}
	});
}

function isRealNode(node: ZenNode): node is RealNode {
	return node.type === "artifact" || node.type === "step";
}

function checkEdgeExists(edges: ZenEdge[], source: string, target: string) {
	return edges.some((edge) => edge.source === source && edge.target === target);
}

function findMissingNodes(realNodes: RealNode[], nodes: ZenNode[]): RealNode[] {
	return realNodes.filter((realNode) => !nodes.some((node) => node.id === realNode.id));
}

function findExistingArtifactNode(nodes: ZenNode[], missingNode: RealNode): RealNode | undefined {
	return nodes.find((node) => isRealNode(node) && node.data.id === missingNode.data.id) as
		| RealNode
		| undefined;
}

function connectExistingNode(
	existingNode: RealNode,
	stepName: string,
	artifactName: string,
	inputs: Record<string, ArtifactVersion> | undefined,
	outputs: Record<string, ArtifactVersion> | undefined,
	edges: ZenEdge[]
) {
	if (inputs && artifactName in inputs && !checkEdgeExists(edges, existingNode.id, stepName)) {
		createEdge(edges, existingNode.id, stepName, `${stepName}--${artifactName}`);
	}

	if (outputs && artifactName in outputs && !checkEdgeExists(edges, stepName, existingNode.id)) {
		createEdge(edges, stepName, existingNode.id, `${stepName}--${artifactName}`);
	}
}

function createEdge(edges: ZenEdge[], source: string, target: string, id: string) {
	edges.push({ id, source, target });
}

function connectMissingNode(
	missingNode: RealNode,
	stepName: string,
	artifactName: string,
	inputs: Record<string, ArtifactVersion> | undefined,
	outputs: Record<string, ArtifactVersion> | undefined,
	edges: ZenEdge[]
) {
	if (inputs && artifactName in inputs && !checkEdgeExists(edges, missingNode.id, stepName)) {
		createEdge(edges, missingNode.id, stepName, `${stepName}--${artifactName}`);
	}

	if (outputs && artifactName in outputs && !checkEdgeExists(edges, stepName, missingNode.id)) {
		createEdge(edges, stepName, missingNode.id, `${stepName}--${artifactName}`);
	}
}
