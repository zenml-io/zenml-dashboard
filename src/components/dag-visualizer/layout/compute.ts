import {
	ArtifactNodeMetadata,
	IntermediateArtifactNode,
	IntermediatePreviewNode,
	IntermediateStepNode,
	StepNodeMetadata,
	Node as ZenNode
} from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";

export function computeNodes(nodes: ZenNode[], runStatus: ExecutionStatus) {
	const realSteps = getRealSteps(nodes, runStatus);
	const realArtifacts = getArtifactNodes(nodes, runStatus);
	const previewNodes = getPreviewNodes(nodes, runStatus);
	return [...realSteps, ...realArtifacts, ...previewNodes];
}

function getRealSteps(nodes: ZenNode[], runStatus: ExecutionStatus): IntermediateStepNode[] {
	const realSteps = nodes.filter(isStepNode).filter((n) => !isPreviewNode(n));
	return realSteps.map((n) => {
		const metadata = n.metadata as StepNodeMetadata;
		return {
			id: n.node_id!,
			type: "step",
			data: {
				...metadata,
				step_id: n.id!,
				step_name: n.name,
				runStatus
			}
		};
	});
}

function getArtifactNodes(
	nodes: ZenNode[],
	runStatus: ExecutionStatus
): IntermediateArtifactNode[] {
	const realArtifacts = nodes.filter(isArtifactNode).filter((n) => !isPreviewNode(n));
	return realArtifacts.map((n) => {
		const metadata = n.metadata as ArtifactNodeMetadata;
		return {
			id: n.node_id!,
			type: "artifact",
			data: {
				...metadata,
				artifact_id: n.id!,
				artifact_name: n.name,
				runStatus
			}
		};
	});
}

function getPreviewNodes(nodes: ZenNode[], runStatus: ExecutionStatus): IntermediatePreviewNode[] {
	const ghostNodes = nodes.filter((n) => isPreviewNode(n));
	return ghostNodes.map((n) => {
		const isStep = isStepNode(n);
		return {
			id: n.node_id!,
			type: isStep ? "previewStep" : "previewArtifact",
			data: {
				node_name: n.name,
				runStatus
			}
		};
	});
}

function isStepNode(node: ZenNode) {
	return node.type === "step";
}

function isArtifactNode(node: ZenNode) {
	return node.type === "artifact";
}

function isPreviewNode(node: ZenNode) {
	return !node.id;
}
