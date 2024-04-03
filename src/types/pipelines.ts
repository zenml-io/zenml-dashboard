import { components, operations } from "./core";

export type PipelineNamespace = components["schemas"]["PipelineNamespaceResponse"];
export type PipelineNamespaceBody = components["schemas"]["PipelineNamespaceResponseBody"];
export type PipelineNameSpacesPage = components["schemas"]["Page_PipelineNamespaceResponse_"];

export type PipelineBody = components["schemas"]["PipelineResponseBody"];

export type PipelineNamespacesParams = NonNullable<
	operations["list_pipeline_namespaces_api_v1_pipeline_namespaces_get"]["parameters"]["query"]
>;
