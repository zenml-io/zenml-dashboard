import { components, operations } from "./core";

export type ExecutionStatus = components["schemas"]["ExecutionStatus"];
export type PipelineRun = components["schemas"]["PipelineRunResponse"];
export type PipelineRunBody = components["schemas"]["PipelineRunResponseBody"];

export type PipelineRunOvervieweParams = NonNullable<
	operations["list_runs_api_v1_runs_get"]["parameters"]["query"]
>;
export type PipelineRunPage = components["schemas"]["Page_PipelineRunResponse_"];

export type LineageGraph = components["schemas"]["LineageGraph"];
export type StepNode = components["schemas"]["StepNode"];
export type StepNodeDetails = components["schemas"]["StepNodeDetails"];
export type ArtifactNode = components["schemas"]["ArtifactNode"];
export type ArtifactNodeDetails = components["schemas"]["ArtifactNodeDetails"];
export type ZenEdge = components["schemas"]["Edge"];
export type ZenNode = StepNode | ArtifactNode;
