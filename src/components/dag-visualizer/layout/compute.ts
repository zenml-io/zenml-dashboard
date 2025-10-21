import {
	IntermediateArtifactNode,
	IntermediatePreviewNode,
	IntermediateStepNode,
	NodeTypes,
	Node as ZenNode
} from "@/types/dag-visualizer";
import { ExecutionStatus } from "@/types/pipeline-runs";
import {
	getPreviewNodes as getPreviewNodes_lib,
	getRealArtifacts,
	getRealSteps,
	getRealTriggeredRuns,
	isStepNode
} from "../node-types";

export function computeNodes(nodes: ZenNode[], runStatus: ExecutionStatus) {
	const realSteps = getRealStepNodes(nodes, runStatus);
	const realArtifacts = getArtifactNodes(nodes, runStatus);
	const previewNodes = getPreviewNodes(nodes, runStatus);
	return [...realSteps, ...realArtifacts, ...previewNodes];
}

function getRealStepNodes(nodes: ZenNode[], runStatus: ExecutionStatus): IntermediateStepNode[] {
	const realSteps = [...getRealSteps(nodes), ...getRealTriggeredRuns(nodes)];
	return realSteps.map((n) => {
		const metadata = n.metadata;

		return {
			id: n.node_id!,
			type: n.type as NodeTypes,
			data: {
				...metadata,
				node_id: n.id!,
				node_name: n.name,
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
	const ghostNodes = getPreviewNodes_lib(nodes);
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
