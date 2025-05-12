import { ArtifactVersion } from "./artifact-versions";
import { components, operations } from "./core";
import { Step } from "./steps";

export type ExecutionStatus = components["schemas"]["ExecutionStatus"];
export type PipelineRun = components["schemas"]["PipelineRunResponse"];
export type PipelineRunBody = components["schemas"]["PipelineRunResponseBody"];

export type PipelineRunOvervieweParams = NonNullable<
	operations["list_runs_api_v1_runs_get"]["parameters"]["query"]
>;

export type PipelineRunDetailQueryParams = NonNullable<
	operations["get_run_api_v1_runs__run_id__get"]["parameters"]["query"]
>;
export type PipelineRunPage = components["schemas"]["Page_PipelineRunResponse_"];

type ArtifactNodeDetails = ArtifactVersion & { name: string; artifactType: "input" | "output" };
export type ArtifactNode = {
	id: string;
	placeholderId: string;
	type: "artifact";
	substitutions?: Record<string, string>;
	data: ArtifactNodeDetails;
};

export type StepNode = {
	id: string;
	placeholderId: string;
	type: "step";
	data: Step;
};

export type PlaceholderNode = {
	id: string;
	type: "previewStep" | "previewArtifact";
	data: { label: string; status: ExecutionStatus };
};
export type ZenEdge = {
	id: string;
	target: string;
	source: string;
};

export type RealNode = ArtifactNode | StepNode;

export type ZenNode = RealNode | PlaceholderNode;
