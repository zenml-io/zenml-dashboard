import { ArtifactVersion } from "@/types/artifact-versions";
import { ArtifactNode, StepNode, ZenEdge } from "@/types/pipeline-runs";
import { StepDict } from "@/types/steps";
import { addEdge } from "./helper";

export function extractExistingNodes(stepConfig: StepDict) {
	const nodes = extractNodes(stepConfig);
	const edges = extractEdges(stepConfig);
	return { nodes, edges };
}

function extractNodes(stepConfig: StepDict) {
	const steps: StepNode[] = [];
	const artifactNodes: ArtifactNode[] = [];

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		// Create a step node
		steps.push({
			id: step.id,
			originalId: stepName,
			type: "step",
			data: step
		});

		// Create artifact nodes for each unique output
		const outputs = step.body?.outputs as { [key: string]: ArtifactVersion[] };
		Object.entries(outputs || {}).forEach(([outputName, artifactVersions]) => {
			artifactVersions.forEach((version) => {
				const originalId = `${stepName}--${outputName}--${version.id}`;
				if (artifactNodes.find((node) => node.id === version.id)) return;
				artifactNodes.push({
					id: version.id,
					originalId,
					type: "artifact",
					data: { ...version, name: version.body?.artifact.name || outputName }
				});
			});
		});

		// Create artifact nodes for each unique input
		const inputs = step.body?.inputs as { [key: string]: ArtifactVersion };
		Object.entries(inputs || {}).forEach(([inputName, artifactVersion]) => {
			const originalId = `${stepName}--${inputName}--${artifactVersion.id}`;

			if (artifactNodes.find((node) => node.id === artifactVersion.id)) return;

			artifactNodes.push({
				id: artifactVersion.id,
				originalId,
				type: "artifact",
				data: { ...artifactVersion, name: inputName }
			});
		});
	});
	return { steps, artifactNodes };
}

function extractEdges(stepConfig: StepDict): ZenEdge[] {
	const edges: ZenEdge[] = [];

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		const outputs = step.body?.outputs as { [key: string]: ArtifactVersion[] };
		// add edge between step and output artifact
		Object.entries(outputs || {}).forEach(([_, artifactVersions]) => {
			artifactVersions.forEach((version) => {
				edges.push(addEdge(step.id, version.id));
			});
		});

		const inputs = step.body?.inputs as { [key: string]: ArtifactVersion };
		// add edge between input artifact and step
		Object.entries(inputs || {}).forEach(([_, artifactVersion]) => {
			edges.push(addEdge(artifactVersion.id, step.id));
		});
	});

	return edges;
}
