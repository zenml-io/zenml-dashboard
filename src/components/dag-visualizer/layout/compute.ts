import {
	IntermediateArtifactNode,
	IntermediatePreviewNode,
	IntermediateStepNode,
	Node as ZenNode
} from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";
import { getRealArtifacts, getRealPreviewNodes, getRealSteps, isStepNode } from "../node-types";

export function computeNodes(nodes: ZenNode[], runStatus: ExecutionStatus) {
	const realSteps = getRealStepNodes(nodes, runStatus);
	const realArtifacts = getArtifactNodes(nodes, runStatus);
	const previewNodes = getPreviewNodes(nodes, runStatus);
	return [...realSteps, ...realArtifacts, ...previewNodes];
}

function getRealStepNodes(nodes: ZenNode[], runStatus: ExecutionStatus): IntermediateStepNode[] {
	const realSteps = getRealSteps(nodes);
	return realSteps.map((n) => {
		const metadata = n.metadata;
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
	const realArtifacts = getRealArtifacts(nodes);
	return realArtifacts.map((n) => {
		const metadata = n.metadata;
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
	const ghostNodes = getRealPreviewNodes(nodes);
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
