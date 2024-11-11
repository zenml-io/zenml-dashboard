import { ArtifactVersion } from "@/types/artifact-versions";
import { RealNode, ZenEdge } from "@/types/pipeline-runs";
import { StepDict } from "@/types/steps";
import { addEdge } from "./helper";

export function extractExistingNodes(stepConfig: StepDict) {
	const nodes = extractNodes(stepConfig);
	const edges = extractEdges(stepConfig);
	return { nodes, edges };
}

function extractNodes(stepConfig: StepDict) {
	const nodes: RealNode[] = [];

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		// Create a step node
		nodes.push({
			id: step.id,
			placeholderId: stepName,
			type: "step",
			data: step
		});

		// Create artifact nodes for each unique output
		const outputs = step.body?.outputs as { [key: string]: ArtifactVersion[] };
		Object.entries(outputs || []).forEach(([outputName, artifactVersions]) => {
			artifactVersions.forEach((version) => {
				const placeholderId = `${stepName}--${outputName}--${version.id}`;
				nodes.push({
					id: version.id,
					placeholderId,
					type: "artifact",
					data: { ...version, name: version.body?.artifact.name || outputName }
				});
			});
		});

		// Create artifact nodes for each unique input
		const inputs = step.body?.inputs as { [key: string]: ArtifactVersion };
		Object.entries(inputs || {}).forEach(([inputName, artifactVersion]) => {
			const placeholderId = `${stepName}--${inputName}--${artifactVersion.id}`;
			nodes.push({
				id: artifactVersion.id,
				placeholderId,
				type: "artifact",
				data: { ...artifactVersion, name: inputName }
			});
		});
	});
	return nodes;
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
