import {
	ArtifactNode,
	ExecutionStatus,
	PlaceholderNode,
	RealNode,
	StepNode,
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
	placeHolderArtifacts: PlaceholderNode[];
	placeHolderSteps: PlaceholderNode[];
	realEdges: ZenEdge[];
	realArtifacts: ArtifactNode[];
	realSteps: StepNode[];
	runStatus: ExecutionStatus;
};
export function mergeRealAndPlacehodlerData({
	placeholderEdges,
	placeHolderArtifacts,
	placeHolderSteps,
	realEdges,
	realArtifacts,
	realSteps,
	runStatus
}: Args): { nodes: ZenNode[]; edges: ZenEdge[] } {
	const realNodes: RealNode[] = [...realArtifacts, ...realSteps];
	const helperNodes: ZenNode[] = [];
	const helperEdges: ZenEdge[] = [];

	placeHolderArtifacts.forEach((artifact) => {
		const existingRealArtifacts = realArtifacts.filter((realArtifact) => {
			return realArtifact.originalId.startsWith(artifact.id);
		});

		if (existingRealArtifacts.length === 0) {
			helperNodes.push({ ...artifact, data: { ...artifact.data, status: runStatus } });
			return;
		}

		existingRealArtifacts.forEach((realArtifact) => {
			helperNodes.push({ ...realArtifact, helperId: artifact.id });
		});
	});

	placeHolderSteps.forEach((step) => {
		const existingRealSteps = realSteps.filter((realStep) => realStep.originalId === step.id);
		if (existingRealSteps.length === 0) {
			helperNodes.push({ ...step, data: { ...step.data, status: runStatus } });
			return;
		}
		existingRealSteps.forEach((realStep) => {
			helperNodes.push(realStep);
		});
	});

	// in case there are realEdges where both the source and target are realNodes, add them to the helperEdges
	realEdges.forEach((edge) => {
		const source = helperNodes.find((node) => node.id === edge.source);
		const target = helperNodes.find((node) => node.id === edge.target);

		if (source && target) {
			helperEdges.push(edge);
		}
	});

	// in case there are placeHolderEdges where both the source and target are placeholderNodes, add them to the helperEdges
	placeholderEdges.forEach((edge) => {
		const source = helperNodes.find((node) => node.id === edge.source);
		const target = helperNodes.find((node) => node.id === edge.target);

		if (source && target) {
			helperEdges.push(edge);
		}

		if (source && !target) {
			const realTarget = realNodes.find((node) => node.originalId === edge.target);
			if (realTarget) {
				helperEdges.push({ ...edge, target: realTarget.id });
			}
		} else if (!source && target) {
			const realSource = realNodes.find((node) => node.originalId === edge.source);
			if (realSource) {
				helperEdges.push({ ...edge, source: realSource.id });
			}
		}
	});

	placeholderEdges.forEach((edge) => {
		const realSource = realNodes.find((node) => node.originalId === edge.source);
		const realTarget = realNodes.find((node) => node.originalId === edge.target);

		if (realSource && realTarget) {
			helperEdges.push({ ...edge, source: realSource.id, target: realTarget.id });
		}
	});

	const styledEdges = helperEdges.map((edge) => {
		const realNode = realNodes.find((n) => n.id === edge.target);
		return {
			...edge,
			style: { stroke: realNode ? "#9CA3AF" : "#D1D5DB", strokeWidth: 2 }
		};
	});

	return { nodes: helperNodes, edges: styledEdges };
}
