import { components } from "./core";

export type PipelineDeployment = components["schemas"]["PipelineDeploymentResponse"];
export type StepOutput = components["schemas"]["Step-Output"];
export type StepOutputInput = {
	step_name: string;
	output_name: string;
};

export type ExternalArtifactConfig = components["schemas"]["ExternalArtifactConfiguration-Output"];
export type ModelVersionLazyLoader = components["schemas"]["ModelVersionDataLazyLoader-Output"];
export type ClientLazyLoader = components["schemas"]["ClientLazyLoader"];
