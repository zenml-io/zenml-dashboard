import { components, operations } from "./core";

export type StackComponent = components["schemas"]["ComponentResponse"];
export type StackComponentType = components["schemas"]["StackComponentType"];
export type StackComponentPage = components["schemas"]["Page_ComponentResponse_"];
export type StackComponentListParams = NonNullable<
	operations["list_stack_components_api_v1_components_get"]["parameters"]["query"]
>;
