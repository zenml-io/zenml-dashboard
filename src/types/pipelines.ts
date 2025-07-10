import { components, operations } from "./core";

export type Pipeline = components["schemas"]["PipelineResponse"];
export type PipelineBody = components["schemas"]["PipelineResponseBody"];
export type PipelineList = components["schemas"]["Page_PipelineResponse_"];

export type PipelineListParams = NonNullable<
	operations["list_pipelines_api_v1_pipelines_get"]["parameters"]["query"]
>;
