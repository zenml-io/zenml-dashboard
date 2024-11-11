import {
	ExecutionStatus,
	PlaceholderNode,
	RealNode,
	ZenEdge,
	ZenNode
} from "@/types/pipeline-runs";

export function addEdge(source: string, target: string): ZenEdge {
	return {
		id: `${source}--${target}`,
		source,
		target
	};
}

type Args = {
	placeholderEdges: ZenEdge[];
	placeholderNodes: PlaceholderNode[];
	realEdges: ZenEdge[];
	realNodes: RealNode[];
	runStatus: ExecutionStatus;
};
export function mergeRealAndPlacehodlerData({
	placeholderEdges,
	placeholderNodes,
	realEdges,
	realNodes,
	runStatus
}: Args): { nodes: ZenNode[]; edges: ZenEdge[] } {
	const placeholderSteps = placeholderNodes.filter((node) => node.type === "previewStep");
	const placeholderArtifacts = placeholderNodes.filter((node) => node.type === "previewArtifact");
	const realSteps = realNodes.filter((node) => node.type === "step");
	const realArtifacts = realNodes.filter((node) => node.type === "artifact");

	const finalNodes: ZenNode[] = [...realSteps];
	const finalEdges: ZenEdge[] = [];

	// if there are placeholderNodes that do not have a corresponding realNode, add them to the finalNodes
	placeholderSteps.forEach((step) => {
		const existingRealSteps = realSteps.filter((realStep) =>
			realStep.placeholderId.startsWith(step.id)
		);
		if (existingRealSteps.length === 0) {
			finalNodes.push({ ...step, data: { ...step.data, status: runStatus } });
			return;
		}
	});

	placeholderArtifacts.forEach((placeholderArtifact) => {
		const existingRealArtifacts = realArtifacts.filter((realArtifact) =>
			realArtifact.placeholderId.startsWith(placeholderArtifact.id)
		);
		if (existingRealArtifacts.length === 0) {
			finalNodes.push({
				...placeholderArtifact,
				data: { ...placeholderArtifact.data, status: runStatus }
			});
			return;
		}
	});

	realArtifacts.forEach((realArtifact) => {
		const duplicateRealArtifacts = finalNodes.filter((node) => node.id === realArtifact.id);
		if (duplicateRealArtifacts.length === 0) {
			finalNodes.push(realArtifact);
		}
	});

	// in case there are realEdges where both the source and target are realNodes, add them to the finalEdges
	realEdges.forEach((edge) => {
		const source = finalNodes.find((node) => node.id === edge.source);
		const target = finalNodes.find((node) => node.id === edge.target);

		if (source && target) {
			finalEdges.push(edge);
		}
	});

	// in case there are placeHolderEdges where both the source and target are placeholderNodes, add them to the finalEdges
	placeholderEdges.forEach((edge) => {
		const source = finalNodes.find((node) => node.id === edge.source);
		const target = finalNodes.find((node) => node.id === edge.target);

		if (source && target) {
			finalEdges.push(edge);
		}

		if (!source && target) {
			const realSource = realNodes.find((node) => node.placeholderId.startsWith(edge.source));
			if (realSource) {
				finalEdges.push({ ...edge, source: realSource.id });
			}
		}
	});

	placeholderEdges.forEach((edge) => {
		const realSource = realNodes.find((node) => node.placeholderId.startsWith(edge.source));
		const realTarget = realNodes.find((node) => node.placeholderId.startsWith(edge.target));

		if (realSource && realTarget) {
			finalEdges.push({ ...edge, source: realSource.id, target: realTarget.id });
		}
	});

	// deduplicate edges in case they have the same source and target
	const dedupedEdges: ZenEdge[] = [];
	finalEdges.forEach((edge) => {
		const duplicateEdges = dedupedEdges.filter(
			(e) => e.source === edge.source && e.target === edge.target
		);

		if (duplicateEdges.length === 0) {
			dedupedEdges.push(edge);
		}
	});

	const styledEdges = finalEdges.map((edge) => {
		const realNode = realNodes.find((n) => n.id === edge.target);
		return {
			...edge,
			style: { stroke: realNode ? "#9CA3AF" : "#D1D5DB", strokeWidth: 2 }
		};
	});

	return { nodes: finalNodes, edges: styledEdges };
}
