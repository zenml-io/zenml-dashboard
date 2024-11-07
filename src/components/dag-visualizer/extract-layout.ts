import { ArtifactVersion } from "@/types/artifact-versions";
import {
	ClientLazyLoader,
	ExternalArtifactConfig,
	ModelVersionLazyLoader,
	StepOutput,
	StepOutputInput
} from "@/types/pipeline-deployments";
import { PlaceholderNode, RealNode, ZenEdge } from "@/types/pipeline-runs";
import { Step } from "@/types/steps";

export function extractPlaceholderLayout(stepConfig: Record<string, StepOutput>) {
	const nodes: PlaceholderNode[] = [];
	const edges: ZenEdge[] = [];

	function addNode(id: string, type: "previewArtifact" | "previewStep", label: string) {
		nodes.push({
			id,
			type,
			data: {
				label,
				status: "running"
			}
		});
	}

	function addEdge(source: string, target: string) {
		edges.push({
			id: `${source}--${target}`,
			source,
			target
		});
	}

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		// Create a step node
		nodes.push({
			id: stepName,
			type: "previewStep",
			data: { label: stepName, status: "running" }
		});

		// Create artifact nodes for each output
		Object.keys(step.config.outputs || {}).forEach((outputName) => {
			const artifactId = `${stepName}--${outputName}`;

			addNode(artifactId, "previewArtifact", outputName);

			// Create an edge from the step to its output artifact
			addEdge(stepName, artifactId);
		});

		// Create edges between input artifacts and the current step
		const inputs = (step.spec.inputs as Record<string, StepOutputInput>) ?? {};
		Object.keys(inputs).forEach((inputName) => {
			const input: StepOutputInput = inputs[inputName];
			const inputArtifactId = `${input.step_name}--${input.output_name}`;

			// Create an edge from the input artifact to the current step
			addEdge(inputArtifactId, stepName);
		});

		// add external Artifacts
		const externalInputs =
			(step.config.external_input_artifacts as Record<string, ExternalArtifactConfig>) || {};
		Object.keys(externalInputs).forEach((inputName) => {
			const externalArtifactId = `${stepName}--${inputName}`;
			addNode(externalArtifactId, "previewArtifact", inputName);
			addEdge(externalArtifactId, stepName);
		});

		// model artifacts or metadata
		const modelArtifacts =
			(step.config.model_artifacts_or_metadata as Record<string, ModelVersionLazyLoader>) || {};

		Object.keys(modelArtifacts).forEach((inputName) => {
			const modelArtifactId = `${stepName}--${inputName}`;
			addNode(modelArtifactId, "previewArtifact", inputName);
			addEdge(modelArtifactId, stepName);
		});

		// client lazy loaded artifacts
		const clientLazyLoadedArtifacts =
			(step.config.client_lazy_loaders as Record<string, ClientLazyLoader>) || {};

		Object.keys(clientLazyLoadedArtifacts).forEach((inputName) => {
			const clientLazyLoadedArtifactId = `${stepName}--${inputName}`;
			addNode(clientLazyLoadedArtifactId, "previewArtifact", inputName);
			addEdge(clientLazyLoadedArtifactId, stepName);
		});

		// handle direct links
		const upstreamSteps = step.spec.upstream_steps || [];
		const diff = upstreamSteps.filter(
			(upstreamName) => !Object.values(inputs).some((input) => input.step_name === upstreamName)
		);
		diff.forEach((item) => addEdge(item, stepName));
	});

	return { nodes, edges };
}

export type StepDict = Record<string, Step>;
export function extractExistingNodes(stepConfig: StepDict) {
	const nodes: RealNode[] = [];

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		// Create a step node
		nodes.push({
			id: stepName,
			type: "step",
			data: step
		});

		const outputs = step.body?.outputs as { [key: string]: ArtifactVersion[] };
		Object.entries(outputs || {}).forEach(([outputName, artifactVersions]) => {
			console.log(artifactVersions);
			artifactVersions.forEach((version) => {
				const artifactId = `${stepName}--${outputName}`;
				nodes.push({
					id: artifactId,
					type: "artifact",
					data: { ...version, name: outputName }
				});
			});
		});

		const inputs = step.body?.inputs as { [key: string]: ArtifactVersion };
		Object.entries(inputs || {}).forEach(([inputName, artifactVersion]) => {
			const artifactId = `${stepName}--${inputName}`;

			if (nodes.find((node) => node.id === artifactId)) return;

			nodes.push({
				id: artifactId,
				type: "artifact",
				data: { ...artifactVersion, name: inputName }
			});
		});
	});
	return nodes;
}
