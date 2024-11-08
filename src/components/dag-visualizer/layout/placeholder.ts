import {
	ClientLazyLoader,
	ExternalArtifactConfig,
	ModelVersionLazyLoader,
	StepOutput,
	StepOutputInput
} from "@/types/pipeline-deployments";
import { PlaceholderNode, ZenEdge } from "@/types/pipeline-runs";
import { addEdge } from "./helper";

export function extractPlaceholderLayout(stepConfig: Record<string, StepOutput>) {
	const steps: PlaceholderNode[] = [];
	const artifacts: PlaceholderNode[] = [];
	const edges: ZenEdge[] = [];

	function addArtifact(id: string, type: "previewArtifact" | "previewStep", label: string) {
		artifacts.push({
			id,
			type,
			data: {
				label,
				status: "running"
			}
		});
	}

	Object.keys(stepConfig).forEach((stepName) => {
		const step = stepConfig[stepName];

		// Create a step node
		steps.push({
			id: stepName,
			type: "previewStep",
			data: { label: stepName, status: "running" }
		});

		// Create artifact nodes for each output
		Object.keys(step.config.outputs || {}).forEach((outputName) => {
			const artifactId = `${stepName}--${outputName}`;

			addArtifact(artifactId, "previewArtifact", outputName);

			// Create an edge from the step to its output artifact
			edges.push(addEdge(stepName, artifactId));
		});

		// Create edges between input artifacts and the current step
		const inputs = (step.spec.inputs as Record<string, StepOutputInput>) ?? {};
		Object.keys(inputs).forEach((inputName) => {
			const input: StepOutputInput = inputs[inputName];
			const inputArtifactId = `${input.step_name}--${input.output_name}`;

			// Create an edge from the input artifact to the current step
			edges.push(addEdge(inputArtifactId, stepName));
		});

		// add external Artifacts
		const externalInputs =
			(step.config.external_input_artifacts as Record<string, ExternalArtifactConfig>) || {};
		Object.keys(externalInputs).forEach((inputName) => {
			const externalArtifactId = `${stepName}--${inputName}`;
			addArtifact(externalArtifactId, "previewArtifact", inputName);
			edges.push(addEdge(externalArtifactId, stepName));
		});

		// model artifacts or metadata
		const modelArtifacts =
			(step.config.model_artifacts_or_metadata as Record<string, ModelVersionLazyLoader>) || {};

		Object.keys(modelArtifacts).forEach((inputName) => {
			const modelArtifactId = `${stepName}--${inputName}`;
			addArtifact(modelArtifactId, "previewArtifact", inputName);
			edges.push(addEdge(modelArtifactId, stepName));
		});

		// client lazy loaded artifacts
		const clientLazyLoadedArtifacts =
			(step.config.client_lazy_loaders as Record<string, ClientLazyLoader>) || {};

		Object.keys(clientLazyLoadedArtifacts).forEach((inputName) => {
			const clientLazyLoadedArtifactId = `${stepName}--${inputName}`;
			addArtifact(clientLazyLoadedArtifactId, "previewArtifact", inputName);
			edges.push(addEdge(clientLazyLoadedArtifactId, stepName));
		});

		// handle direct links
		const upstreamSteps = step.spec.upstream_steps || [];
		const diff = upstreamSteps.filter(
			(upstreamName) => !Object.values(inputs).some((input) => input.step_name === upstreamName)
		);
		diff.forEach((item) => edges.push(addEdge(item, stepName)));
	});

	return { steps, artifacts, edges };
}
