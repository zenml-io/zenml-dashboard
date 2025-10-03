import { components } from "./core";

export type StepOutput = components["schemas"]["Step-Output"];
export type StepOutputInput = {
	step_name: string;
	output_name: string;
};

export type ExternalArtifactConfig = components["schemas"]["ExternalArtifactConfiguration"];
export type ModelVersionLazyLoader = components["schemas"]["ModelVersionDataLazyLoader"];
export type ClientLazyLoader = components["schemas"]["ClientLazyLoader"];
